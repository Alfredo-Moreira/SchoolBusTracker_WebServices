

// 3/17/2017

var express = require ('express');
var app = express();

	app.get('/',function (req,res) {
		res.send('Hello World!')

	});

app.listen(8080, '127.0.0.1', function(){
	 console.log('Example app listening on port 8080!')
});




mongoose.connect(config.mongoDB_connection_string); 
'mongoDB_connection_string':'mongodb://127.0.0.1/BusTrackerDB';

mongoose.connect(BusTrackerDB,function (err) {
    if(err){
        console.log('Connection Error',err);
    }else {
        console.log('Connection Successful');
    }

});

//Require config file

var config = require('./config/config');
