const express = require('express');

const app = express();

app.use(express.static(__dirname + "/view"));

const server = app.listen(6789);

const io = require('socket.io')(server);

const bodyParser = require('body-parser');
    
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', function(req, res) {
		res.render("colors");
	})


io.sockets.on('connection', function (socket) { //2
	socket.on("blue_click", function(data){ //4
		console.log("blue");
		socket.emit("changeblue")
	});
	socket.on("red_click", function(data){ //4
		console.log("red");
		socket.emit("changered")
	});
	socket.on("green_click", function(data){ //4
		console.log("green");
		socket.emit("changegreen")
	});
});