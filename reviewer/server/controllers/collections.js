var express = require('express');
var app = express();
const mongoose = require('mongoose');
const Document = mongoose.model("Movie")
// mongoose.Promise = global.Promise;

module.exports = {
    index: function(req, res) {
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        var documents = Document({title: req.params.title});
        // var__ creates data then we send that to the name data when we call (err, data)
        Document.find({}, function(err, data){
            if(err){
                console.log("Returned error", err);
                // respond with JSON
                res.json({'status': 500, 'error': err})
            }
            else {
                // respond with JSON
                res.json({'status': 200, 'documents': data})
            }
        });
    },
    create: function(req, res) {

        var documents = new Document(req.body);
        console.log(documents, "THIS IS THE DOCUMENT &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        // var__ creates data then we send that to the name data when we call (err, data)
        documents.save(function(err, data){
            // console.log(err);
            if(err){
                console.log("Returned error", err);
                // respond with JSON
                res.json({'status': 500, 'error': err})
            }
            else {
                    // respond with JSON
                    console.log(req.params.id)
                    res.json({'status': 200, 'documents': data})
            }
        });
    },
    show: function(req, res) {
            // var__ creates data then we send that to the name data when we call (err, data)
            Document.findOne({_id: req.params.id}, req.body, function(err, data){
            if(err){
                console.log("Returned error", err);
                // respond with JSON
                res.json({'status': 500, 'error': err})
            }
            else {
                // respond with JSON
                res.json({'status': 200, 'documents': data})
            }
           });
    },
    update: function(req, res) {
        Document.update({_id: req.params.id}, {title: req.body.title, detail: req.body.detail, star: req.body.star, name: req.body.name}, {$push: { detail: req.body.detail, star: req.body.star, name: req.body.name}},function(err, document) {
                    if(err){
                        console.log("Returned error", err);
                        // respond with JSON
                        res.json({'status': 500, 'error': err})
                    }else{
                        // respond with JSON
                        console.log(req.params.title)
                        res.json({'status': 200, "document": document}) 
                        }
                    });
        console.log("heeeeeeeeerrrrrrrrrreeee")
        },

    change: function(req, res, next) {
        Document.findOneAndUpdate({_id: req.params.id}, {title: req.body.title, detail: req.body.detail, star: req.body.star, name: req.body.name}, {$push: { detail: req.body.detail, star: req.body.star, name: req.body.name}},function(err, document) {
                    if(err){
                        console.log("Returned error", err);
                        // respond with JSON
                        res.json({'status': 500, 'error': err})
                    }else{
                        // respond with JSON
                        console.log(req.params.title)
                        res.json({'status': 200, "document": document}) 
                        }
                    });
        console.log("heeeeeeeeerrrrrrrrrreeee")
        },

    destroy: function(req, res) {
        var documents = Document({_id: req.params.id});
        // var__ creates data then we send that to the name data when we call (err, data)
        Document.remove({_id: req.params.id}, function(err, data){
            // console.log(err);
            if(err){
                console.log("Returned error", err);
                // respond with JSON
                res.json({'status': 500, 'error': err})
            }
            else {
                // respond with JSON
                res.json({'status': 200})
            }
        });
    }
};


