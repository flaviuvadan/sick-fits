// start up the Node server
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');

require('dotenv').config({
	path: 'variables.env'
});

const server = createServer();

// middleware - some function that will run in the middle, between a request and a response
// involved in processes such as authentication, data transformation, etc.
// TODO: use express middleware to handle cookie (JWT)
// allow access to cookies in a nice format
server.express.use(cookieParser());

// TODO: use express middleware to populate current users

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL,
		},
	},
	deets => {
		console.log(`Server is now running on port ${deets.port}`);
	},
);
