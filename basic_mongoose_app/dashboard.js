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

// create a schema and set it up too mangoose
var PodSchema = new mongoose.Schema({
	// add the object: then value
    name:  { type: String, required: true, minlength: 2},
    age:  { type: Number},
    hobby:  { type: String}
    // update and created at
}, {timestamps: true });

mongoose.model('Pod', PodSchema); // We are setting this Schema in our Models as 'Pod'
var Pod = mongoose.model('Pod') // We are retrieving this Schema from our Models, named 'Pod'

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Root Request
app.get('/', function(req, res) {
Pod.find({}, function(err, data){
	if(err){
        	console.log(err)
            res.redirect('/');
        }
        else {
    		res.render('dashboard', {pods: data});
        }
	});
})

//gathering specific data 
app.get('/pod/:id', function(req, res) {
	console.log(req.params.id, "THIS IS THE ID ARE YOU HERE$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
	Pod.find({ _id : req.params.id}, function(err, data){

        if(err){
        	console.log(err)
            res.send(err);
        }
        else {
        	console.log('herre')
        	console.log(data, "THIS IS THE DATA")
            res.render('specdata', {pods: data});
        }
	})
});


//post new data
app.post('/addData', function (req, res){
    // set the name property of session.
    post_data = {
    name: req.body.name,
    age: req.body.age,
    hobby: req.body.hobby
    };
    console.log(req.body.hobby);
    //code to add user to db 
    // redirect the user back to the root route. 

    var pod = new Pod(req.body);
    pod.save(function(err){
    	// console.log(err);
        if(err){
        	console.log(err)
            res.redirect('/add');
        }
        else {
        	console.log('herre')
        	console.log(pod);
            res.redirect('/');
        }
    });

});

// new data html
app.get('/addpod', function(req, res) {
	Pod.find({}, function(err, data){
	if(err){
        	console.log(err)
            res.redirect('/');
        }
        else {
    		res.render('dashnew', {pods: data});
        }
	});
    // send to the add new page
});

// edit pod html
app.get('/edit/:id', function(req, res) {
	console.log(req.params.id, "THIS IS THE ID ARE YOU HERE!!!!!!!!!!!!!!!!!!!!")
	Pod.find({ _id : req.params.id}, function(err, data){

        if(err){
        	console.log(err)
            res.send(err);
        }
        else {
        	console.log('herre')
        	console.log(data, "THIS IS THE DATA")
            res.render('dashedit', {pods: data});
        }
	})
});

app.post('/:id', function(req, res) {
	console.log(req.params.id, "THIS IS THE ID ARE YOU HERE?????????????")
	Pod.update({ _id : req.params.id}, {$set: {name: req.body.name, age: req.body.age, hobby: req.body.hobby}}, {multi: false}, function(err, data){

        if(err){
        	console.log(err)
            res.send(err);
        }
        else {
        	console.log('herre')
        	console.log(data, "THIS IS THE DATA")
            res.redirect('/');
        }
	})
});


app.get('/pod/destroy/:id', function(req, res) {
	Pod.remove({ _id : req.params.id}, function(err, data){

        if(err){
        	console.log(err)
            res.send(err);
        }
        else {
            res.redirect('/');
        }
	})
});


// listens for port
app.listen(8000, function() {
    console.log("listening on port 8000");
})



