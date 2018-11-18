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
};

module.exports = Query;
