var controller = require('../controllers/collections.js');
// code to talk to the server.js file
const mongoose = require('mongoose');

//export functions
module.exports = function(app){
    // code to talk to quote.js from our route.js
    // Routes
    // Root Request
    app.get('/people', controller.index)

    app.get('/new/:name/', controller.create)

    app.get('/remove/:name/', controller.destroy)

    app.get('/:name', controller.show)
};
