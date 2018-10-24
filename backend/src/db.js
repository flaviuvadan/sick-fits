// ReactJS is using the Apollo Client to query the GraphQL Yoga end point and then, on the
// server, GraphQL Yoga is going to connect to the Prisma database.
//
//
// This file connect to the remote Prisma DB and gives us the ability to query it with JS.
// Use Prisma-binding to connect to Prisma
//
// Notice, no imports in NodeJS

const { Prisma } = require('prisma-binding');

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false,
});

module.exports = db;