// Require the Express Module
var express = require('express');

var session = require('express-session');

// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// set up other middleware, such as session
const flash = require('express-flash');

// creates session
app.use(session({
  secret: 'animals',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash());

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Require path
var path = require('path');

// require the mongoose module
var mongoose = require('mongoose');
// to make a model, you can first define a schema, which is just the BLUEPRINT for a model

mongoose.connect('mongodb://localhost/mongoose_practice');

const CommentSchema = new mongoose.Schema({
  comment: {type: String, required: [true]},
  subName: {type: String, required: [true, "Comment must have a name"]},
}, {timestamps: true})
const MessageSchema = new mongoose.Schema({
  message: {type: String, required: [true, "Message must have content"]},
  name:  { type: String, required: true, minlength: 2},
  reply: [CommentSchema]
}, {timestamps: true})

 // We are setting our Schema's
mongoose.model('Comment', CommentSchema);
mongoose.model('Message', MessageSchema);

// We are retrieving our Schemas from our Models
const Comment = mongoose.model('Comment')
const Message = mongoose.model('Message')

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    Message.find({}, function(err, data){
	if(err){
        	console.log(err)
            res.redirect('/');
        }
        else {
    		res.render('messanger', {messages: data});
    		console.log(data, "THIS IS THE MESSAGES ARE YOU HERE DOEE////")
        }
	});
});


app.post('/addData', function (req, res){
    // set the name property of session.
    post_data = {
    name: req.body.name,
    message: req.body.message
    };
    console.log(req.body.message);
    //code to add user to db 
    // redirect the user back to the root route. 

    var message = new Message(req.body);
    message.save(function(err){
    	// console.log(err);
        if(err){
        	console.log(err)
            res.redirect('/');
        }
        else {
        	console.log('herre')
        	console.log(message);
            res.redirect('/');
        }
    });

});

app.post('/addSubData/:id', function (req, res){
    // set the name property of session.
    sub_data = {
    	name: req.body.subName,
    	comment: req.body.comment
    };
    console.log(req.body.subName);
    //code to add user to db 
    // redirect the user back to the root route. 

    var comment = new Comment(req.body);
    comment.save(function(err, comment){
    	// console.log(err);
        if(err){
        	console.log(err)
            res.redirect('/');
        }
        else {
        	
          Message.findOneAndUpdate({_id: req.params.id}, {$push: {reply: comment}}, function(err, data){
               if(err){
                    // handle the error from trying to update the user
					console.log(err, " fasshhhhoooosooooooo")
					res.redirect('/');            
               	}
               else {
                    // it worked! How shall we celebrate?
                    console.log(comment);
            		res.redirect('/');
               	}
          	});
        }
    });
})
    


// listens for port
app.listen(8000, function() {
    console.log("listening on port 8000");
})

