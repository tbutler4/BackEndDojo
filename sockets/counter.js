const express = require('express');

const app = express();

app.use(express.static(__dirname + "/view"));

const server = app.listen(6789);

const io = require('socket.io')(server);

const bodyParser = require('body-parser');
    
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', function(req, res) {
		res.render("counter");
	})

io.sockets.on('connection', function (socket) { //2
	var count = 0;
	socket.on("button_click", function(data){ //4
		count++;
		socket.emit("update_count", {count: count}) //5
	});
	socket.on("reset", function(data){ //8
		count = 0;
		socket.emit("update_count", {count: count}) //9
	});
});
