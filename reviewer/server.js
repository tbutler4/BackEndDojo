const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const flash = require('express-flash');
const session = require('express-session');

app.use(session({
  secret: 'belt',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
// connection to angular below
app.use(bodyParser.json());
// Integrate body-parser with our App
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app)

app.listen(8000, function() {
    console.log("listening on port 8000");
});