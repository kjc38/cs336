//Lab 06 - Karson Chilcott (kjc38)

/* 1.a. All methods besides the GET method will not show that they work by simply using Chrome Tools. All of them show that they work with curl
	Working curl requests:  'curl -x GET localhost:3000/request'	
				'curl -X PUT localhost:3000/request'
				'curl -X POST localhost:3000/request'
				'curl -X DELETE localhost:3000/request'
				'curl --head localhost:3000/request' 
	b. 400 - BAD_REQUEST - There are no pages with these routes, so the request was not a good one. */

/** 2.a. GET and POST
b. The client completes the form which refers and sends it to /forms. It saves the information from the form in the header to give to the /forms route. The data is not modified. */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http_status = require('http-status-codes');

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function (){
	console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/request', function (req, res){
	res.status(200).send("Get Hello World");
});

app.post('/request', function(req, res){
	res.status(200).send('Got a POST request');
});

app.put('/request', function (req, res){
	res.status(200).send('Got a PUT request');
});

app.delete('/request', function (req, res){
	res.status(200).send('Got a DELETE request');
});

app.head('/request', function (req, res){
	res.status(200).send('Got a HEAD request');
});

//If the route isn't /request or /forms, it isn't a good request as I haven't defined those routes, else: make sure that the status comes out as "OK"
app.get('/:route', function (req, res){
	if(req.params.route != 'request' && req.params.route != 'forms'){
		res.sendStatus(http_status.BAD_REQUEST);
	} else{
		res.sendStatus(http_status.OK);
	}
});

//Forms
app.post('/forms', function (req, res){
	res.send('Got a Form POST:<br>Message: <code>' + req.body.user_message + '</code>');
});
