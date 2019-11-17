const express = require('express');
const app = express();
app.use(express.static(__dirname + "/view"));
const server = app.listen(1337);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
    
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', function(req, res) {
		res.render("form");
	})
	// Listen to connection even from the client side
	io.sockets.on('connection', function (socket){
		//server listens to "post_form" event
	 	socket.on("post_form", function (data){
	 		// generate a random number
	 		var random_number = Math.floor((Math.random() * 1000) + 1);
		  //will emit the data to the client
		  socket.emit('update_message', {response: data});
			socket.emit('random_number', {response: random_number});
		})
	})