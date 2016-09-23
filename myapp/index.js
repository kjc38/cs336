var express = require('express');
var app = express();

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.listen(3000, function (){
	console.log('Example app listening on port 3000!');
});

app.use('/static', express.static(__dirname + '/public'));

/**
3.1
-Express.js is based off of Node.js for web apps, while Node.js is the platform for Server-Client communication using JavaScript.
-package.json is the information for the Express app. It gives the information for the application/package without having to store it elsewhere.

3.2
-The files are considered static because don't change after they are loaded.
-Yes the message is still up because the static files do not change anything that isn't their own content.
*/
