// Setting our Static Folder Directory
// app.use(express.static(path.join(__dirname, './client/static')));
// *********************************************************************
// Require the Express Module


var express = require('express');

var session = require('express-session');

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// Require path
var path = require('path');

var app = express();

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// set up other middleware, such as session

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

const flash = require('express-flash');
// require above and  use flash below
app.use(flash());

app.use(session({
  secret: 'quotes',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

require('./server/config/mongoose.js');

// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument
require('./server/config/routes.js')(app)


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})