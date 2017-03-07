

// 3/17/2017

var config = require('./config/config');
var express = require ('express');
var mongoose = require('mongoose');
var app = express();

	app.get('/',function (req,res) {
		res.send('Hello World!')

	});






mongoose.connect(config.mongoDB_connection_string,function (err) {
    if(err){
        console.log('Connection Error',err);
    }else {
        console.log('Connection Successful');
    }

});

//Require config file




app.listen(8080, '127.0.0.1', function(){
	 console.log('Example app listening on port 8080!')
});