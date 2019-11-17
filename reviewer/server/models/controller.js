var mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
    	type: String, required: true, minlength: [1, "Titles must have at least 1 characters"]
    },
    detail: {
        type: Array, required: [true, "Ratings must have a review"], minlength: [3, "Titles must have at least 3 characters"]
    },
    name: {
        type: Array, required: [true, "Ratings must have a name"]
    },
    star: {
        type: Array, required: true
    }, 
}, {timestamps: true})

mongoose.model('Movie', MovieSchema);