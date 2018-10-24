// start up the Node server
require('dotenv').config({
    path: 'variables.env'
});

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO: use express middleware to handle cookie (JWT)
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
