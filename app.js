

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io');




app.get('/', function(req, res){

  res.render('index.ejs');

});






app.listen(port = 4000, () => console.log('Connected on port ' + port + ' ! '));