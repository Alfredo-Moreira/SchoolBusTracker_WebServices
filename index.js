

// 3/17/2017
//Libraries
const express = require ('express');
const mongoose = require('mongoose');
const helmet =  require('helmet');
const morgan = require('morgan');

//JS Files
const passport = require('./routes/v1/passport');
const config = require('./config/config');

//Variables
const port = 8000;


//Instantiate Application
var app = express();

//Define Routes
const authenticate = require('./routes/v1/authenticate');
const user = require('./routes/v1/user');


//Application Configuration
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());



//App Routes
app.use('/v1/authenticate',authenticate);
app.use('/v1/user',user);
app.get('/',function (req,res) {
        //To be redirected to help page or swagger page
		res.redirect('/v1/authenticate/unauthorized');

});

//Connect to Mongo DB
mongoose.connect(config.mongoDB_connection_string,(err)=>{
    if(err){
        console.error('Connection Error',err);
    }else {
        console.log('Connection Successful');
    }

});

app.listen(port,"localhost",(err)=>{
    if(err){
        console.error(err);
    }
	console.log('Example app listening on port: '+port);
});