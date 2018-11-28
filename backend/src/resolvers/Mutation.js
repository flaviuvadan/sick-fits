const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

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
		// TODO: check whether user is logged in
		// access the database
		return await ctx.db.mutation.createItem({
			data: {
				...args,
			}
		}, info); // passing info makes sure item promise upon creation
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
		const item = await ctx.db.query.item(
			{ where },
			`{ id, title }`
		);
		// check if user owns the item, or have permissions
		// TODO
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
	 * /user sign out process
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info
	 * @returns {Promise<void>}
	 */
	async signout(parent, args, ctx, info) {
		// clear the cookie that stores the JWT
		ctx.response.clearCookie('token');
		return {
			message: '200',
		}
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
		maxAge: ONE_YEAR // 1 year cookie
	});
}

module.exports = Mutation;
