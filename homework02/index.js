//Homework 02
//kjc38 - Karson Chilcott

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var bodyParser = require('body-parser');
var http_status = require('http-status-codes');

var PEOPLE_FILE = path.join(__dirname, 'people.json');

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function (){
	console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Person Class
function Person(first, last, login, start){
	this.first = first;
	this.last = last;
	this.login = login;
	this.start = new Date(start);
}	

//People variable in JSON format
var people = {
	"ld1": { first:"Laxus", last:"Dreyar", start:"2006/03/12"},
	"fj1": { first:"Freed", last:"Justine", start:"2009/05/03"},
	"lh1": { first:"Lucy", last:"Heartfilia", start: "2016/03/10"}
};

//Shows a list of the people in the people variable
app.get('/people', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		res.json(ppl);
	});
});

//Adds new person to the people file
app.post('/people', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.body.login){
				console.log("ID Found");
				//process.exit(1);
				return;
			}
		}

		var newPer = {
			"login": req.body.login,
			"first": req.body.first,
			"last": req.body.last,
			"start": req.body.start,
		};
		ppl.push(newPer);
		fs.writeFile(PEOPLE_FILE, JSON.stringify(ppl, null, 4), function(err){
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(ppl);
		});
	});
});

//shows all the information on the user with that specific login
	//404 not found if not available
app.get('/person/:login/', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.params.login){
				res.json(ppl[i]);
				return;
			}
		}
		res.sendStatus(404);
	});
});

//Delete person that has a given login
app.delete('/person/:login/', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.params.login){
				console.log(ppl[i])
				var before = ppl.slice(0,i);
				var after = ppl.slice(i+1);
				var all = before.concat(after);

				fs.writeFile(PEOPLE_FILE, JSON.stringify(all, null, 4), function(err){
					if (err) {
						console.error(err);
						process.exit(1);
					}
					res.json(all);
				});				

				return;
			}
		}
		res.sendStatus(404);		
	});
});


//shows the full name of the user with that specific login
	//404 not found if not available
app.get('/person/:login/name/', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.params.login){
				res.json(ppl[i].first + " " + ppl[i].last);
				return;
			}
		}
		res.sendStatus(404);
	});
});

//shows how long the the user with that specific login has been with the organization
	//404 not found if not available
app.get('/person/:login/years/', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.params.login){
				//res.json(ppl[i]);

				var startDate = new Date(ppl[i].start);
	
				var today = new Date();
				var sen = today.getFullYear() - startDate.getFullYear();

				res.json(sen + " years");
				
				return;
			}
		}
		res.sendStatus(404);
	});
});

//Search Form for Client
app.post('/searchform', function (req, res){
	fs.readFile(PEOPLE_FILE, function(err, data){
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var ppl = JSON.parse(data);

		for(var i = 0; i < ppl.length; i++){
			if(ppl[i].login === req.body.login){
				var name = ppl[i].first + " " + ppl[i].last;
				var result = "Name: " + name + "Start Date: " + ppl[i].start;
				res.json(result);
				return;
			}
		}
		res.sendStatus(404);
	});
});


