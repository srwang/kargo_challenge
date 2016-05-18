var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var ejs = require('ejs');

app.use(urlencodedBodyParser);
app.set('view_engine', 'ejs');
app.use(express.static('public'));

//routes
app.get('/', function (req, res){
	//pull top three reddit threads
	request.get('https://www.reddit.com/r/all.json?limit=3', function (err, data, body) {
		if (err) console.log(err);
		var jsonReddit = JSON.parse(body),
			listings = [];

		jsonReddit.data.children.forEach(function(listing){
			//use thread id (listing.data.id) to grab top comment for that thread
			request.get('https://www.reddit.com/r/all/comments/' + listing.data.id + '.json?limit=1', function (err, data, body) {
				if (err) console.log(err);

				//console.log(JSON.parse(body)[0]);
				var topComment = JSON.parse(body)[1].data.children[0].data.body;
				//cut down to first 100 characters
				topComment = topComment.slice(0, 99);

				listing.data.comment = topComment;
				
			});

			listing.num_comments = listing.num_comments - 1;
			listings.push(listing.data);
		});

		//send to template
		res.render('main.html.ejs', {listings: listings});
	});
});

//get separate datas/comments
//send the message to the client-side
//append html


//server
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.listen('3000', function(){
	console.log("Listening on port 3000!");
})
