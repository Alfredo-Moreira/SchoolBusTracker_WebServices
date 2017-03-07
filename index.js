

// 3/17/2017

var express = require ('express');
var app = express();

	app.get('/',function (req,res) {
		res.send('Hello World!')

	});

app.listen(8080, '127.0.0.1', function(){
	 console.log('Example app listening on port 8080!')
});

 var mongoose = require ('mongoose');
 mongoose.connect('mongodb://localhost/myapp');