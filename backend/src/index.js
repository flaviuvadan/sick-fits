// start up the Node server
// do not chance the order of imports, keep appending after 'db'
require('dotenv').config({
	path: 'variables.env'
});

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');
const db = require('./db');

// start up the Node server
const server = createServer();

// middleware - some function that will run in the middle, between a request and a response
// involved in processes such as authentication, data transformation, etc.
// TODO: use express middleware to handle cookie (JWT)
// allow access to cookies in a nice format
server.express.use(cookieParser());

// TODO: use express middleware to populate current users
// decode JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
	const { token } = req.cookies;
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		// place userId onto the request for future requests to access
		req.userId = userId;
	}
	// pass along the request
	next();
});

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
