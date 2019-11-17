const mongoose = require('mongoose');
// create schema
const UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 5},
    quote: { type: String, required: true}
}, {timestamps: true });

mongoose.model('User', UserSchema) // We are retrieving this Schema from our Models, named 'User'
