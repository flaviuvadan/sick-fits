const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
// takes callback-based functions and makes them Promise-based
const { promisify } = require('util');
const { transport, makeEmail } = require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');


const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const ONE_HOUR = 3600000;

const Mutation = {
	/**
	 * Create an item
	 * @param parent
	 * @param args - arguments of createItem
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<*>}
	 */
	async createItem(parent, args, ctx, info) {
		// access check
		if (!ctx.request.userId) {
			throw new Error('You must log in first');
		}

		return await ctx.db.mutation.createItem({
			data: {
				...args,
				// this is how we create a relationship between an item and the user who created it
				user: {
					connect: {
						id: ctx.request.userId,
					}
				},
			}
			// passing info makes sure item promise upon creation
		}, info);
	},

	/**
	 * Update an item
	 * @param parent
	 * @param args - arguments of createItem
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<*>}
	 */
	async updateItem(parent, args, ctx, info) {
		// first, take a copy of updates
		const updates = { ...args };
		// remove ID from updates
		delete updates.id;
		// now, run update
		return await ctx.db.mutation.updateItem({
			data: {
				...updates,
			},
			where: {
				id: args.id,
			}
		}, info);
	},

	/**
	 * Delete an item
	 * @param parent
	 * @param args - arguments of deleteItem
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<*>}
	 */
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// find/search/query the item
		const item = await ctx.db.query.item({
				where: {
					id: args.id
				},
			},
			// return structure
			`{ 
				id
				title
				user { id }
			}`);
		// check if user owns the item, or has permissions
		const ownsItem = item.user.id === ctx.request.userId;
		const hasPermission = ctx.request.user.permissions.some(permission => {
			['ADMIN', 'ITEMDELETE'].includes(permission);
		});

		if (!ownsItem && !hasPermission) {
			throw new Error('You do not have permission to delete');
		}

		// delete it
		return ctx.db.mutation.deleteItem({
				where
			},
			info);
	},

	/**
	 * User sign up process
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async signup(parent, args, ctx, info) {
		// makes generation unique for bcrypt
		const SALT = 10;

		// get the lower-cased email first
		args.email = args.email.toLowerCase();

		// one-way hash the password
		const password = await bcrypt.hash(args.password, SALT);

		// create user in the database
		// ...args will "explode" args and notice the use of syntactic sugar
		const user = await ctx.db.mutation.createUser({
			data: {
				...args,
				password,
				permissions: {
					set: ['USER']
				}
			},
		}, info);

		// check jwt
		const token = generateToken(user);

		// set cookie with token
		setCookie(token, ctx);

		// return the user to the browser
		return user;
	},

	/**
	 * /user sign in process
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async signin(parent, { email, password }, ctx, info) {
		// check if there's a user with that email
		const user = await ctx.db.query.user({
			where: {
				email: email
			}
		});

		if (!user) {
			throw new Error(`No user found for email ${email}`);
		}

		// check if password is correct
		const valid = await bcrypt.compare(password, user.password);

		if (!valid) {
			throw new Error('Invalid password');
		}

		// check jwt
		const token = generateToken(user);

		// set cookie with token
		setCookie(token, ctx);

		// return user
		return user;
	},

	/**
	 * User sign out process
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	signout(parent, args, ctx, info) {
		// clear the cookie that stores the JWT
		ctx.response.clearCookie('token');
		return {
			message: '200',
		}
	},

	/**
	 * User password reset
	 * @param parent
	 * @param args - arguments of requestReset
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async requestReset(parent, args, ctx, info) {
		// check if this is a real user
		const user = await ctx.db.query.user({
			where: {
				email: args.email
			}
		});
		if (!user) {
			throw new Error(`No user found for email ${args.email}`);
		}
		// set a reset token and expiry on that user
		// randomBytes takes the number of bytes to generate, generates a buffer, then we turn it to hex string
		const randomBytesPromise = promisify(randomBytes);
		const resetToken = (await randomBytesPromise(20)).toString('hex');
		const resetTokenExpiry = Date.now() + ONE_HOUR;
		const res = await ctx.db.mutation.updateUser({
			where: {
				email: args.email
			},
			data: {
				resetToken: resetToken,
				resetTokenExpiry: resetTokenExpiry
			}
		});

		// email the reset token
		const email = `You recently requested a password reset.\n\n
					   <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
					   Follow this link to reset your password</a>`;
		const emailResponse = await transport.sendMail({
			from: 'reset@sickfits.com',
			to: user.email,
			subject: 'Password Reset - Sick Fits',
			html: makeEmail(email),
		});

		// return message
		return {
			message: '200'
		};
	},

	/**
	 * Reset password
	 * @param parent
	 * @param args - arguments of resetPassword
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async resetPassword(parent, args, ctx, info) {
		// check whether passwords match
		if (args.password !== args.confirmPassword) {
			throw new Error('Passwords do not match!');
		}
		// check if token is legit

		// check token expiry
		const [user] = await ctx.db.query.users({
			where: {
				resetToken: args.resetToken,
				resetTokenExpiry_gte: Date.now() - ONE_HOUR,
			},
		});
		if (!user) {
			throw new Error('Token either invalid or expired');
		}
		// hash password
		const password = await bcrypt.hash(args.password, 10);
		// save password and remove resetToken and tokenExpiry
		const updatedUser = await ctx.db.mutation.updateUser({
			where: {
				email: user.email
			},
			data: {
				password: password,
				resetToken: null,
				resetTokenExpiry: null
			}
		});
		// generate JWT
		const token = generateToken(updatedUser);
		// set JWT
		setCookie(token, ctx);
		// return user
		return updatedUser;
	},

	/**
	 * Update permissions
	 * @param parent
	 * @param args - arguments of resetPassword
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async updatePermissions(parent, args, ctx, info) {
		// check if logged in
		isLoggedIn(ctx);
		// query current user
		const currentUser = await ctx.db.query.user({
			where: {
				id: ctx.request.userId,
			}
		}, info);
		// check if has permissions
		const permissions = ['ADMIN', 'PERMISSIONUPDATE'];
		hasPermission(currentUser, permissions);
		// update permissions
		return ctx.db.mutation.updateUser({
			data: {
				permissions: {
					// Prisma-specific set notation
					set: args.permissions,
				}
			},
			where: {
				id: args.userId,
			},
		}, info)
	},

	/**
	 * Add to users' cart
	 * @param parent
	 * @param args - arguments of resetPassword
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async addToCart(parent, args, ctx, info) {
		// check if logged in
		isLoggedIn(ctx);
		const userId = ctx.request.userId;

		// query user's current cart, destructure first item
		const [existingCartItem] = await ctx.db.query.cartItems({
			where: {
				item: {
					id: args.id,
				},
				user: {
					id: userId,
				},
			},
		});
		// check if that item is already in the cart, increment if so
		if (existingCartItem) {
			return ctx.db.mutation.updateCartItem({
				where: {
					id: existingCartItem.id,
				},
				data: {
					quantity: existingCartItem.quantity + 1,

				},
			}, info);
		}
		// o/w, create fresh cartItem for user
		return ctx.db.mutation.createCartItem({
			// establish connections between users and items
			data: {
				user: {
					connect: {
						// user id
						id: userId,
					}
				},
				item: {
					connect: {
						// past item id
						id: args.id,
					}
				},
			}
		}, info);
	},

	/**
	 * Remove from users' cart
	 * @param parent
	 * @param args - arguments of resetPassword
	 * @param ctx - context of request
	 * @param info - additional info (query coming from client side)
	 * @returns {Promise<void>}
	 */
	async removeFromCart(parent, args, ctx, info) {
		// get item
		const item = await ctx.db.query.cartItem({
			where: {
				id: args.id,
			}
		}, `{
				id 
				user { 
					id 
				} 
			}`);
		if (!item) {
			throw new Error('No item found');
		}

		if (item.user.id !== ctx.request.userId) {
			throw new Error('Permission denied');
		}

		return ctx.db.mutation.deleteCartItem({
			where: {
				id: args.id,
			}
		}, info)
	},

	/**
	 * Create an order
	 * @param parent
	 * @param args - arguments of resetPassword
	 * @param ctx - context of request
	 * @param info - additional info (query coming from client side)
	 * @returns {Promise<void>}
	 */
	async createOrder(parent, args, ctx, info) {
		// query current user and check signed in
		isLoggedIn(ctx);
		// re-calc total price; this avoids users fiddling with JS values passed to back-end
		const user = await ctx.db.query.user({
			where: {
				id: ctx.request.userId,
			}
		}, `{ 
				id 
				name 
				email 
				cart { 
					id 
					quantity 
					item { 	
						id 
						title 
						price 
						description 
						image 
						largeImage
					} 
				}
			}`);
		// create Stripe charge
		const amount = user.cart.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
		const charge = await stripe.charges.create({
			amount,
			currency: 'USD',
			source: args.token,
			// could have description along with this; everything is in the Stripe docs
		});
		// convert cart items to order items
		const orderItems = user.cart.map(cartItem => {
			const orderItem = {
				// the spread of cartItem.item is the same as what's commented below but uses syntactic sugar
				...cartItem.item,
				// id: cartItem.item.id,
				// title: cartItem.item.title,
				// description: cartItem.item.description,
				// image: cartItem.item.image,
				// largeImage: cartItem.item.largeImage,
				// price: cartItem.item.price,
				quantity: cartItem.quantity,
				user: {
					connect: {
						id: user.id,
					}
				}
			};
			delete orderItem.id;
			return orderItem;
		});
		// create order
		const order = await ctx.db.mutation.createOrder({
			data: {
				total: charge.amount,
				charge: charge.id,
				items: {
					// passing an array of back-end type dict orderItems and Prisma will create the array of actual
					// of [OrderItem]
					create: orderItems,
				},
				user: {
					connect: {
						id: user.id,
					}
				},
			}
		});
		// clean up - clear users' cart/delete cart items from db
		const cartItemIds = user.cart.map(cartItem => cartItem.id);
		await ctx.db.mutation.deleteManyCartItems({
			where: {
				id_in: cartItemIds,
			}
		});
		// return order to client
		return order;
	}
};

/**
 * Generate a token for a user
 * @param user - User
 * @returns signed token
 */
function generateToken(user) {
	// create a JWT for the user
	return jwt.sign({
		userId: user.id,
	}, process.env.APP_SECRET);
}

/**
 * Sets a cookie with the given JWT token
 * @param token - signed token (generateToken)
 * @param ctx - context
 */
function setCookie(token, ctx) {
	// set the JWT as a cookie on the response
	// httpOnly - makes sure one cannot access the token via JS (through 3rd party extension, rogue Chrome ext, etc)
	// maxAge - how long the cookie lasts
	ctx.response.cookie('token', token, {
		httpOnly: true,
		maxAge: ONE_YEAR
	});
}

/**
 * Check if a user is logged in
 * @param ctx - context of request
 * @returns nothing if logged in,
 */
function isLoggedIn(ctx) {
	if (!ctx.request.userId) {
		throw new Error('You must log in first');
	}
}

module.exports = Mutation;
