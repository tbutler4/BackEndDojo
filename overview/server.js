var express = require('express');

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
//JSON body parser
app.use(bodyParser.json());
// connection to angular below
app.use(express.static( __dirname + '/public/dist/public' ));


require('./server/config/mongoose.js');

// where the routes used to be, we're going to require routes.js
// since routes.js exports a function, server.js will receive that function
// invoke the function we get from the require and pass it app as an argument
require('./server/config/routes.js')(app)


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})