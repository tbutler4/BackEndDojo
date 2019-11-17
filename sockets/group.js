const express = require('express');

const app = express();

app.use(express.static(__dirname + "/view"));

const server = app.listen(6789);

const io = require('socket.io')(server);

const bodyParser = require('body-parser');
    
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', function(req, res) {
		res.render("group");
	})