var express = require('express');
var five = require('johnny-five');

var board = new five.Board();
var led;
var status = "Apagado";

board.on("ready", function() {
	led = new five.Led(13);
});

var app = express();

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var handlebars = require('express-handlebars')
.create({defaultLayout:null});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.post('/led', function(req, res) {
	var command = req.body.acao;
	console.log(command);
	if (command == "apagar") {
		console.log("Apagando...");
		if(led.off()){
			status = "Apagado";
			console.log("Sucesso. Apagado.");

			res.send(status);
		} else {
			res.send("error");
		}
	}

	if (command == "acender") {
		console.log("Acendendo...");
		if(led.on()){
			status = "Aceso";
			console.log("Sucesso. Aceso.");

			res.send(status);
		} else {
			res.send("error");
		}
	}
});

app.get('/', function(req, res) {
	res.render('home', {ledStatus: status});
});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(req, res) {
	res.status(500);
	res.render('500');
});

app.listen(3000, function() {
	console.log('Express started');
});