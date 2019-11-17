const mongoose = require('mongoose');
// create schema
const peopleSchema = new mongoose.Schema({
    name:  { type: String}
}, {timestamps: true });

mongoose.model('Document', peopleSchema)