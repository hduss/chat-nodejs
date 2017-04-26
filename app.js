

const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app);

const io = require('socket.io').listen(server);

const ent = require('ent');




app.get('/login', (req, res) => {

	res.render('login.ejs');

})



app.get('/chat', (req, res) => {

  res.render('index.ejs');

});


io.on('connection', (socket) => {

	console.log('user connected');

	socket.on('disconnect', () => {

		console.log('user disconnected ! ');
	});


	socket.on('chat', (message) => {

		const msg = ent.encode(message);
		console.log('New message : ' + msg);
		io.emit('chat', msg);

	});
});



server.listen(port = 8080, () => console.log('Connected on port ' + port + ' ! '));