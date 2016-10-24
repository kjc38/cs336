var express = require('express');
var app = express();

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function (){
	console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(__dirname + '/public'));

var name = { "login":"lab07" };

app.get('/fetch', function (req, res){
	res.json(name.login)
});
