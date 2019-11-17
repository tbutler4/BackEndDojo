var express = require('express');
var app = express();
const mongoose = require('mongoose');
// const Document = mongoose.model("Document")
// All necessary requires above..., such as the Quote model.
module.exports = {
    index: function(req, res) {
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        var documents = Document({id: req.params.id});
        // var__ creates data then we send that to the name data when we call (err, data)
        Document.find({}, function(err, data){
            if(err){
                console.log("Returned error", err);
            	// respond with JSON
            	res.json({message: "Error", error: err})
        	}
            else {
            	// respond with JSON
            	res.json({message: "Success", documents: data})
            }
        });
    },
};
