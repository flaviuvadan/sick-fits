## sick-fits
A web-app I built as part of the course offered by [Wes Bos](https://wesbos.com/).

The front-end component of sick-fits is built with ReactJS along with NextJS
for server-side rendering, routing, and tooling. React-Apollo, an adapter for 
interfacing with the Apollo client, with the Apollo client being used for caching, 
GraphQL mutations and fetching.

The back-end component uses Prisma for CRUD (create, read, update, delete) 
operations on MySQL. GraphQL Yoga is used as a proxy on top of Prisma for 
handling data logic.  

The app is deployed to Heroku, hosting a PostgreSQL database (10000 rows/free), with a server
deployed on top of the database (0.5GB RAM, 1vCPU/free).

Deploying Prisma server to Heroku:
1. Heroku PostgreSQL 
1. Heroku server
1. Prisma deploy (`prisma deploy -- -n`, which will ask what instance to set up on)

Deploying Yoga server to Heroku (`https://sick-fits-prod-yoga-backend.herokuapp.com/`)
1. `heroku apps:create sick-fits-prod-yoga-backend` (`brew install heroku/brew/heroku` if you do not have the `heroku` 
CLI)
1. `git remote add heroku-backend https://git.heroku.com/sick-fits-prod-yoga-backend.git`
1. To push only sub-folders to the Heroku backend, `git subtree push --prefix backend heroku-backend master`, which will
push up the `backend` to the `heroku-backend` subtree on the branch master (error logs can be listed via running 
`heroku logs --tail --app sick-fits-prod-yoga-backend`). Re-building can be performed through the Heroku UI (restart all
dynos) or through the same git command


Deploying frontend (`https://sick-fits-flav.herokuapp.com/`):
1. `heroku apps:create sick-fits-flav`
1. `git remote add heroku-frontend https://git.heroku.com/sick-fits-flav.git`
