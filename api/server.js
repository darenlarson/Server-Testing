const express = require('express');

const server = express();

server.use(express.json());


// ----------    Route Handlers    ----------
server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/', async (req, res) => {
    // const rows = await 
});

server.delete('/', async (req, res) => {

});

module.exports = server;