var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

app.use(urlencodedBodyParser);

//generate unique string for oauth authentification
function randomString() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
var CLIENT_ID = 'h0ZkcDYV3yl0LA',
	str = randomString();

app.get('/', function (req, res){
	request.get('https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&state=' + str + '&redirect_uri=http://localhost:3000/&duration=permanent&scope=read', function (err, data, body) {
			res.send(body);
	});
});

// request.post('https://www.reddit.com/api/v1/access_token', 'grant_type=https://oauth.reddit.com/grants/installed_client&device_id=' + randomString(), function (err, res, body){
// 	if (err) console.log(err);
// 	console.log(body);
// });

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.listen('3000', function(){
	console.log("Listening on port 3000!");
})
