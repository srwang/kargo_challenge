var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var ejs = require('ejs');

app.use(urlencodedBodyParser);
app.set('view_engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res){
	res.render('main.html.ejs');
})

function getThreadData(index, response) {
	//grab top three on r/all
	request.get('https://www.reddit.com/r/all.json?limit=3', function (err, data, body) {

		if (err) console.log(err);
		var threadsData = JSON.parse(body).data.children;

		//find specific thread based on rank from top
		request.get('https://www.reddit.com/r/all/comments/' + threadsData[index].data.id + '.json?limit=1', function (err, data, body) {

			if (err) console.log(err);

			//grab thread meta-data
			var threadData = JSON.parse(body)[0].data.children[0].data;
			//change num_comments to number of additional comments
			threadData.num_comments = threadData.num_comments - 1;
			if(threadData.num_comments === NaN) threadData.num_comments = 0;
			
			if (threadData.url.indexOf('imgur') === -1) threadData.thumbnail = '';

			//grab top comment
			var topComment = JSON.parse(body)[1].data.children[0].data.body;
			//cut down to first 100 characters
			topComment = topComment.slice(0, 99);
			//attach comment to same object as metadata
			threadData.comment = topComment;
			
			console.log(threadData);
			//send as json to route
			response.status(200).send({threadData: threadData});
		});

	});
}

//index is article rank from top
for (var index = 0; index <= 2; index++) {
	//front-end will get from these routes- so that I can send data from three requests to same view
	(function(index){
		app.get('/article' + index, function (request, response) {
			getThreadData(index, response);
		});
	})(index);
}

//server
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.listen('3000', function(){
	console.log("Listening on port 3000!");
})
