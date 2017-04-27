
// chargement des modules serveur
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
// chargement socket
const io = require('socket.io').listen(server);


const ent = require('ent');

const bodyParser = require('body-parser');
const session = require('express-session');


// fs sert a manipuler les fichier
const fs = require('fs');

let csv = require('csv-db');

const crypto = require('crypto');




// use bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// use session middleware // init session
app.use(session({secret:'secret', cookie: { maxAge: 60000 }}));



// on verifie si le fichier existe
fs.exists('./data/db.csv', (exists) => {

    if(!exists) {

    	//Sinon on le crée
        fs.writeFileSync('./data/db.csv');
    }
});

// on instancie une nouvelle csvDb, son emplacement et ses tables
const csvDb = new csv('./data/db.csv', ['id', 'pseudo', 'password']);



app.get('/registration',(req, res) => {


	res.render('registration.ejs');


});


// une fois le formulaire soumis
app.post('/registration', (req, res) =>{




	// si les champs sont bien remplis
	if (req.body.login && req.body.password) {

		// on rentre les données dans des variables de session
		req.session.username = req.body.login;
		req.session.password = req.body.password;


		const login = req.session.username;
		const password = req.session.password;


		const hashPass = crypto.createHmac('sha256', password)
			.update('Love analFisting')
			.digest('asian');

		console.log(hashPass);




		// pui son redirige vers le login
		res.redirect('/login');





		console.log(login);
		console.log(hashPass);





		// si le mot de pass est > a 8 caracteres
		if (password.length >= 8) {

			// alors on cree un object
			const user = { 

				pseudo: login,
				password: hashPass

			};

			// on insert les users dans la csvDb
			csvDb.insert(user).then((data) => {

				console.log('User added !');

				console.log(data);
			});
		};
	};

});




app.get('/login', (req, res) => {

	//req.params.login = req.body.username;


	res.render('login.ejs');


});


app.get('/chat', (req, res) => {

	res.render('index.ejs');

	fs.readFile('./data/db.json', (err, data) => {

	  if (err) throw err;

	  console.log(data);



	});




});


app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');

    res.send(404, 'Page introuvable !');

});


io.on('connection', (socket) => {

	console.log('user connected');

	socket.on('disconnect', () => {

		console.log('user disconnected ! ');
	});


	socket.on('chat', (message) => {

		const msg = ent.encode(message);
		console.log('New message from :' + msg);
		io.emit('chat', msg);

	});
});



server.listen(port = 8080, () => console.log('Connected on port ' + port + ' ! '));