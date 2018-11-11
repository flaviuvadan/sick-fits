const Query = {
    /**
     * Get items
     * @param parent -
     * @param args - arguments of items
     * @param ctx - context of request
     * @param info - additional info
     */
    async items(parent, args, ctx, info) {
        return await ctx.db.query.items();
    }
};

module.exports = Query;
