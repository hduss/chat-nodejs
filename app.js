

const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app);

const io = require('socket.io').listen(server);




app.get('/', function(req, res){

  res.render('index.ejs');

});


io.on('connection', (socket) => {

	console.log('user connected');

	socket.on('disconnect', () => {

		console.log('user disconnected ! ');
	});


	socket.on('chat', (msg) => {

		console.log('New message : ' + msg);
		io.emit('chat', msg);

	});
});



server.listen(port = 8080, () => console.log('Connected on port ' + port + ' ! '));