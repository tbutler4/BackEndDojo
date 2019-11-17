
var quotes = require('../controllers/quotes.js');
// code to talk to the server.js file
const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name:  { type: String, required: true, minlength: 5},
//     quote: { type: String, required: true}
// }, {timestamps: true });
// mongoose.model('User', UserSchema)


module.exports = function(app){
    // code to talk to quote.js from our route.js
   
    // Routes
    // Root Request
    app.get('/', quotes.index)

    app.post('/quotes',quotes.create)

    app.get('/quotes', quotes.show)
};
