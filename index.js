// implement your API here
const express = require('express');

// Import the database to be used in the http request
const UserData = require('./data/db.js')

// this invokes express on the server
const server =  express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    UserData.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    UserData.findById(userId)
        .then(userWithId => {
            if (userWithId) {
                res.status(200).json(userWithId);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist."});
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
});

server.post('/api/users', (req, res) => {
    
    const { name, bio} = req.body;
   const UserInfo = req.body;
    UserData.insert(UserInfo)
        .then(UserInfo => {
             if (name || bio) {
            res.status(201).json(UserInfo);
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            } 
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const Info = req.body;
    const { name, bio } = req.body;

    UserData.update(id, Info )
    .then(updated => {
        if (!id) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else if (!name || !bio ) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        } else {
            res.status(200).json(updated);
        } 
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const UserId = req.params.id;

    UserData.remove(UserId) 
        .then(user => {
            if (UserId) {
                res.status(200).json({ message: "User deleted successfully" })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
});



// This declares which port the server is accessed on, usually 5000 or 8000
const port = 5000;

// server.listen() method allows for the server to listen for request
server.listen(port, () => console.log('Server listening on port 5000')); 