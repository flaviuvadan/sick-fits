## sick-fits
A web-app I built as part of the course offered by [Wes Bos](https://wesbos.com/).

The front-end component of sick-fits is built with React.JS along with Next.JS
for server-side rendering, routing, and tooling. React-Apollo, an adapter for 
interfacing with the Apollo client. The Apollo client is used for caching, 
GraphQL mutations and fetching.

The back-end component uses Prisma for CRUD (create, read, update, delete) 
operations on MySQL. GraphQL Yoga is used as a proxy on top of Prisma for 
handling data logic.  
