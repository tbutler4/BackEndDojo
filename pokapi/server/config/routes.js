var controller = require('../controllers/collections.js');
// code to talk to the server.js file
const mongoose = require('mongoose');

//export functions
module.exports = function(app){
    // code to talk to quote.js from our route.js
    // Routes
    // Root Request
    app.get('https://pokeapi.co/api/v2/pokemon/:id/', controller.index)

};
