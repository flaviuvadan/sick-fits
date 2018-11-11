const Query = {
    /**
     * Dogs query
     * @param parent
     * @param args - arguments passed to dogs
     * @param ctx - context of the request
     * @param info - additional info
     */
    dogs(parent, args, ctx, info) {
        global.dogs = global.dogs || [];
        return global.dogs;
    }
};

module.exports = Query;
