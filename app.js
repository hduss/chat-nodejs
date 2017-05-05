
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

const User = require('./User');








// use bodyparser middleware pour recuperer les données saisie dans les formulaires html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// use session middleware // init session
app.use(session({

	secret:'secret',
	cookie: { maxAge: 60000 }
}));



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

		let user = new User();

		console.log(user);


	// si les champs sont bien remplis
	if (req.body.login && req.body.password) {

		// on rentre les données dans des variables de session
<<<<<<< HEAD
		req.session.username = ent(req.body.login);
		req.session.password = ent(req.body.password);
=======
>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc





		// si le mot de pass est > a 8 caracteres
		if (password.length >= 8 || !password || !login) {

			// alors on cree un object
			const user = { 

				pseudo: login,
				password: password

			};


			// on insert les users dans la csvDb
			csvDb.insert(user).then((data) => {

<<<<<<< HEAD
				console.log('New user added : ' + login);
=======
				console.log('User.js added : ' + login);
>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc


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

    req.session.username = req.body.login;
    req.session.password = req.body.password;


    let login = req.session.username;
    let password = req.session.password;

    console.log(login);

	if(!login) {

        console.log(login);

    }

    res.render('login.ejs', {login: login});


});



app.post('/login', (req, res) => {

	// on stocke les données du formulaire dans des variables de session
	req.session.username = req.body.login;
	req.session.password = req.body.password;


	let login = req.session.username;
	let password = req.session.password;


	// on recupere toutes les données de la csvDB
	csvDb.get().then((data) => {


	console.log(login);
	console.log(data);

	// on fait une boucle pour parcourir la BDD
	for ( let i = 0; i < data.length; i++) {


		console.log(i);
		console.log(data[i].password);


		//on compare le login a tous les pseudo de la BDD
		// et si TRUE
		if (login === data[i].pseudo) {


<<<<<<< HEAD
					console.log('FISTFUCKIIING');
					res.redirect('/chat');
				};
=======
			// on fait la meme chose avec le password
			if (password === data[i].password) {

				console.log('FISTFUCKIIING');

				// si le pseudo et le password sont verifiés
				//on permet a l'user d'acceder au tchat
				res.redirect('/chat');

			};

>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc
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

app.post('/chat', (req, res) => {

	res.redirect('/registration');



	//res.redirect('/registration');

});

//renvoi une erreur 404 si url est mauvaise
app.use(function(req, res, next){

    res.setHeader('Content-Type', 'text/plain');

    res.send(404, "DEAD'S NEAR !!!");

});


<<<<<<< HEAD

//+----------------------SOCKET------------------------------------++
=======
//+---------------------------------SOCKET---------------------------------------+
>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc



io.on('connection', (socket) => {

<<<<<<< HEAD
	console.log('User connected');
=======


	console.log('user connected ! ');
>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc

	socket.on('disconnect', () => {

		console.log('user disconnected !');
	});

	// on ecoute l'evenement chat
	socket.on('chat', (message) => {

<<<<<<< HEAD
		let msg = ent.encode(message);
=======
		// on recupere le message envoyé, on l'encode
		const msg = ent.encode(message);
>>>>>>> 958e8055ae5239f21e3e1e91c9f87f1b4222dedc
		console.log('New message from :' + msg);

		// puis on le renvoi a l'index.ejs
		io.emit('chat', msg);

	});
});



server.listen(port = 8080, () => console.log('User.js on port ' + port + ' ! '));