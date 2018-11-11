const Mutation = {
    /**
     * Create an item
     * @param parent -
     * @param args - arguments of createItem
     * @param ctx - context of request
     * @param info - additional info
     */
    async createItem(parent, args, ctx, info) {
        // TODO: check whether user is logged in
        // access the database
        return await ctx.db.mutation.createItem({
            data: {
                ...args,
            }
        }, info); // passing info makes sure item promise upon creation
    }
};

module.exports = Mutation;
