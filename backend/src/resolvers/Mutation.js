const Mutation = {
    /**
     * Create a god
     * @param parent
     * @param args - arguments passed to createDogs
     * @param ctx - context of request
     * @param info - additional info
     */
    createDog(parent, args, ctx, info) {
        global.dogs = global.dogs || [];
        const newDog = {'name': args.name};
        global.dogs.push(newDog);
        return newDog;
    }
};

module.exports = Mutation;
