
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

// crypto pour crypter les passwords
const crypto = require('crypto');

// --> c'est la BDD
let csv = require('csv-db');






// use bodyparser middleware pour recuperer les données saisie dans les formulaires html
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







//--------------------REGISTRATION-------------------------------------++


app.get('/registration',(req, res) => {


	res.render('registration.ejs');


});


// une fois le formulaire soumis
app.post('/registration', (req, res) =>{


	// si les champs sont bien remplis
	if (req.body.login && req.body.password) {

		// on rentre les données dans des variables de session
		req.session.username = ent(req.body.login);
		req.session.password = ent(req.body.password);


		let login = req.session.username;
		let password = req.session.password;




		// si le mot de pass est > a 8 caracteres
		if (password.length >= 8 || !password || !login) {


			// alors on cree un object
			const user = { 

				pseudo: login,
				password: password

			};


			// on insert les users dans la csvDb
			csvDb.insert(user).then((data) => {

				console.log('New user added : ' + login);


			});

			// puis on redirige vers le login
			res.redirect('/login');


		}else{

			res.redirect('/registration');


		}
	};

});







//-------------------------LOGIN-------------------------------------++


app.get('/login', (req, res) => {

	res.render('login.ejs');
});




app.post('/login', (req, res) => {


	req.session.username = req.body.login;
	req.session.password = req.body.password;


	let login = req.session.username;
	let password = req.session.password;



	csvDb.get().then((data) => {


	console.log(login);
	console.log(data);

	for ( let i = 0; i < data.length; i++) {

		console.log(i);
		console.log(data[i].password);

		if (login === data[i].pseudo) {

				if (password === data[i].password) {

					console.log('FISTFUCKIIING');
					res.redirect('/chat');
				};
		};

	};

});



});


//-------------------------CHAT-------------------------------------++



app.get('/chat', (req, res) => {

	req.session.username = req.body.login;
	req.session.password = req.body.password;


	let login = req.session.username;
	let password = req.session.password;

	if (!login && !password) {

		res.redirect('/registration');
	};

	res.render('index.ejs');

});


app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');

    res.send(404, 'Page introuvable !');

});



//+----------------------SOCKET------------------------------------++



io.on('connection', (socket) => {

	console.log('User connected');

	socket.on('disconnect', () => {

		console.log('user disconnected !');
	});


	socket.on('chat', (message) => {

		let msg = ent.encode(message);
		console.log('New message from :' + msg);
		io.emit('chat', msg);

	});
});



server.listen(port = 8080, () => console.log('Connected on port ' + port + ' ! '));