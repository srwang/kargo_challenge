$(document).ready(function(){
	console.log('linked');

	for (var index = 0; index <= 2; index ++) {
		//grab data per article, append dynamically
		$.get('http://localhost:3000/article' + index, function (res) {
			var listing = res.threadData;
			$('body').append(''+
				'<div class="thread-container">'+
					'<h3>'+ listing.ups + ' ' + listing.title + '</h3>'+
					'<a href="https://www.reddit.com/' + listing.permalink + '">Link To Thread</a>'+
					''+
					'<img src="' + listing.thumbnail + '">'+
					'<p>' + listing.comment + ' ...</p>'+
					'<p id="comments-count">And ' + listing.num_comments + ' More</p>'+
				'</div>'+
			'');
		});
	}
});

