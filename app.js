

// 3/17/2017
//Libraries
const express = require ('express');
const mongoose = require('mongoose');
const helmet =  require('helmet');
const morgan = require('morgan');

//JS Files
const passport = require('./routes/v1/passport');
const config = require('./config/config');

//Instantiate Application
var app = express();

//Define Routes
const authenticate = require('./routes/v1/authenticate');
const admin = require('./routes/v1/admin');


//Application Configuration
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

//Variables
var logPath = fs.createWriteStream(path.join(__dirname, '/logs/web_api_logs.log'), {flags: 'a'});


//App Routes
app.use('/v1/authenticate',authenticate);
app.use('/v1/admin',admin);
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

//Set up Prod vs Dev Config -- TODO
app.use(morgan('combined',{stream:logPath}));
app.use(morgan('tiny'));

module.exports = app;