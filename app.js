
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



// use bodyparser middleware pour recuperer les données saisie dans les formulaire html
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


		let login = req.session.username;
		let password = req.session.password;



		// on crypte le password du user
		let hashPass = crypto.createHmac('sha256', password)
			.update('Love analFisting')
			.digest('asian');



		// pui son redirige vers le login
		res.redirect('/login');




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


			});


		}else{


		}
	};

});




app.get('/login', (req, res) => {

	//req.params.login = req.body.username;


	res.render('login.ejs');




	/*if (req.body.login  && req.body.password) {


	};
*/

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
		console.log(data[i].pseudo);

		if (login === data[i].pseudo) {

			console.log('encul22222');
		};


	};



/*
	if (login) {

			console.log('ENCUL2222222');
	};


}, (err) => {

	console.log(err);
*/
});



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



//+---------------------------------SOCKET---------------------------------------+



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