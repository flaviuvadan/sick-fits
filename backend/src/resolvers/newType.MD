# Adding a new type
When you want to add a new type you add it to your `datamodel.graphql`, then prisma deploy via `npm run deploy` (push up 
to Prisma service), which will create a new copy of prisma.graphql, which contains all the queries, mutations, and 
possible different filters. Then the public-facing API `schema.graphql` interfaces with the React application. The 
`type` `Mutation` and `Query` specify what resolvers you have, and keeps track of their implementation (i.e you have to 
implement whatever you have defined in `schema.graphql`). All the logic sits in custom resolvers 
(backend/src/resolvers).  