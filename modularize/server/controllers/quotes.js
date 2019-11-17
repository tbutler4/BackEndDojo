var express = require('express');
var app = express();
const mongoose = require('mongoose');
const User = mongoose.model("User")
// All necessary requires above..., such as the Quote model.
module.exports = {
    index: function(req, res) {
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        res.render('query');
    },
    show: function(req, res) {
        console.log("one11111")
            console.log("one")
           User.find({}, function(err, data){
            console.log("two")
            if(err){
                    console.log(err)
                    res.redirect('/');
                }
                else {
                    console.log('also here')
                    res.render('quotes', {users: data});
                }
           });
    },
    create: function(req, res) {
    	// set the name property of session.
        post_data = {
        name: req.body.name,
        quote: req.body.quote
        };
        console.log(req.body.name);
        console.log(req.body.quote);
        //code to add user to db 
        // redirect the user back to the root route. 

        var user = new User(req.body);
        user.save(function(err){
            // console.log(err);
            if(err){
                console.log(err)
                res.redirect('/');
            }
            else {
                console.log('herre')
                console.log(user);
                res.redirect('/quotes');
            }
        });
    },
    destroy: function(req, res) {
    	// code...
    }
};
