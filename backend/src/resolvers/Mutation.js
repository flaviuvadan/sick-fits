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
	 * @param info - additiona info
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
	}
};

module.exports = Mutation;
