/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

var PEOPLE_FILE = path.join(__dirname, 'people.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://admin:PASSWORD@ds135577.mlab.com:35577/cs336', function (err, dbConnection){
	if (err) throw err;
	
	db = dbConnection;

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/people', function(req, res) {
  /*fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });*/

	var collection = db.collection('lab10');

	collection.find({}).toArray(function(err, data) {
		assert.equal(err, null);
		//console.log("Works?");
		//console.log(data);
		res.json(data);
	});
});

app.post('/api/people', function(req, res) {
  /*fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });*/

	var newPerson = {
		login: req.body.login,
		first: req.body.first,
		last: req.body.last,
		startDate: req.body.startDate,
	};

	var collection = db.collection('hw3');

	collection.insert(newPerson, function(err, data){
		assert.equal(err, null);
		
		res.json(data);
	});
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

});

/* HOMEWORK 2 METHODS
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
*/
