console.log("inside server.js for food trucks");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const flash = require('express-flash');
// const session = require('express-session');
// app.use(flash());
// app.use(session({
//   secret: 'belt',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }))


app.use(bodyParser.json());
// Integrate body-parser with our App


// require('./server/config/mongoose.js');

// require('./server/config/routes.js')(app)

app.use(express.static( __dirname + '/public/dist/public' ));

// app.all('*', (req, res, next) => {
//     res.sendFile(path.resolve('./public/dist/public/index.html'));
// });

app.listen(8000, function() {
    console.log("listening on port 8000");
});