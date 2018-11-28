const { forwardTo } = require('prisma-binding');

const Query = {
	// forwardto('db') for items is the same as implementing as the items() resolver
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db'),
	// /**
	//  * Get items
	//  * @param parent -
	//  * @param args - arguments of items
	//  * @param ctx - context of request
	//  * @param info - additional info
	//  */
	// async items(parent, args, ctx, info) {
	//     return await ctx.db.query.items();
	// }

	/**
	 * @param parent
	 * @param args - arguments of signup
	 * @param ctx - context of request
	 * @param info - additional info, actual query coming from client side
	 * @returns {Promise<void>}
	 */
	currentUser(parent, args, ctx, info) {
		// check if there is a current userId
		if (!ctx.request.userId) {
			// important to return null in this case
			return null;
		} else {
			return ctx.db.query.user({
				where: {
					id: ctx.request.userId
				}
			}, info);
		}
	},
};

module.exports = Query;
