//Homework 01
//kjc38 - Karson Chilcott

var express = require('express');
var app = express();

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function (){
	console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(__dirname + '/public'));


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
	res.json(people);
});

//shows all the information on the user with that specific login
	//404 not found if not available
app.get('/person/:login/', function (req, res){
	if (people[req.params.login] != null){
		res.json(people[req.params.login]);
	} else{
		res.sendStatus(404);
	}
});

//shows the full name of the user with that specific login
	//404 not found if not available
app.get('/person/:login/name/', function (req, res){
	if (people[req.params.login] != null){
		res.json(people[req.params.login].first + " " + 
		people[req.params.login].last);
	} else{
		res.sendStatus(404);
	}
});

//shows how long the the user with that specific login has been with the organization
	//404 not found if not available
app.get('/person/:login/years/', function (req, res){
	if (people[req.params.login] != null){
		var startDate = new Date(people[req.params.login].start);
	
		var today = new Date();
		var sen = today.getFullYear() - startDate.getFullYear();

		res.json(sen + " years");
	} else{
		res.sendStatus(404);
	}
});


