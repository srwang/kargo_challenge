console.log('linked');

var CLIENT_ID = 'sharenren';

function randomString() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var str = randomString();
console.log(str);

$.get('https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&state=' + str + '&redirect_uri=http://localhost:3000/&duration=permanent&scope=read', function (res) {
	console.log(res);
	$('body').innerHtml = res;
});

// $.get('https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&state=' + str + '&redirect_uri=http://localhost:3000/&duration=permanent&scope=read', function (data) {
//     	console.log(data);
//     });

// $.get('http://www.reddit.com/r/all/new?limit=3', function (data){
// 	console.log(data);
// })


//routes
//landing: will print out the html from reddit
//redirect to page with the printed top 3