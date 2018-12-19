## sick-fits
A web-app I built as part of the course offered by [Wes Bos](https://wesbos.com/).

The front-end component of sick-fits is built with React.JS along with Next.JS
for server-side rendering, routing, and tooling. React-Apollo, an adapter for 
interfacing with the Apollo client. The Apollo client is used for caching, 
GraphQL mutations and fetching.

The back-end component uses Prisma for CRUD (create, read, update, delete) 
operations on MySQL. GraphQL Yoga is used as a proxy on top of Prisma for 
handling data logic.  

The app is deployed to Heroku, hosting a PostgreSQL database (10000 rows/free), with a server
deployed on top of the database (0.5GB RAM, 1vCPU/free).

Setup steps:
1. Heroku PostgreSQL 
2. Heroku server
3. Prisma deploy (`prisma deploy -- -n`, which will ask what instance to set up on)
