// Require the Express Module
var express = require('express');

var session = require('express-session');

// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// set up other middleware, such as session
const flash = require('express-flash');

app.use(session({
  secret: 'keyboardkitteh',
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

mongoose.connect('mongodb://localhost/basic_mongoose');

var UserSchema = new mongoose.Schema({
    first_name:  { type: String, required: true, minlength: 5},
    last_name: { type: String, required: true, maxlength: 20 },
    age: { type: Number, min: 1, max: 150 },
    email: { type: String, required: true }
}, {timestamps: true });
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
	// console.log(User);ç
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('validations');
})

app.get('/users', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    
    User.find({}, function(err, users){
    	console.log(err);
    	res.render('users',{'users': users});
    })
})

// Add User Request 
app.post('/users', function (req, res){
    var user = new User(req.body);
    console.log(12);
    user.save(function(err){
    	// console.log(err);
        if(err){
            // if there is an error upon saving, use console.log to see what is in the err object 
            // console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        }
        else {

        	console.log(user);
            res.redirect('/users');
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
