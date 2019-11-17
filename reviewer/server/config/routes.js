var controller = require('../controllers/collections.js');
// code to talk to the server.js file
const mongoose = require('mongoose');
const path = require('path');

module.exports = function(app) {
    app.get('/movies', controller.index)

    app.post('/movie', controller.create)

    app.get('/movies/:id', controller.show)

    app.put('/movies/update/:id', controller.update)

    app.put('/movies/change/:id', controller.change)

    app.delete('/movies/remove/:id', controller.destroy)

    app.post('/movies', controller.index)
};