const express = require('express');

const server = express();

const db = require('../hobbits/hobbitsModel');

server.use(express.json());


// ----------    Route Handlers    ----------
server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/hobbit', (req, res) => {
    db.getAll()
        .then(hobbits => {
            res.status(200).json(hobbits);
        })
});

server.post('/hobbit', (req, res) => {
    const hobbit = req.body;

    db.insert(hobbit)
        .then(hobbit => {
            res.status(201).json({ message: `${hobbit.name} added` });
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

server.delete('/hobbit/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} hobbit deleted` });
            } else {
                res.status(404).json({ message: `${count} hobbits deleted` });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;