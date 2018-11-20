

// 3/17/2017
//Libraries
const express = require ('express');
const helmet =  require('helmet');
const mongoose = require('./mongoose');


//JS Files
const config = require('./config/config');
const passport = require('./routes/v1/passport_admin');

//Environment Variables
const isDev = process.env.NODE_ENV === config.apiInfo.dev;
const port = isDev ? process.env.PORT : 8000;
const hostURL = isDev ? config.url.dev : config.url.test;

// isDev ? config.mongoDBConnection.mongoDB_connection_string :

//Instantiate Application
var app = express();

//Define Routes
const adminAuthenticate = require('./routes/v1/authenticate_admin');
const admin = require('./routes/v1/admin');
const school = require('./routes/v1/school');


//Application Configuration
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

//Application variables
app.set('port',port);
app.set('hostURL',hostURL);
app.set('mongoose',mongoose);

//Connection URL
const mongDBURL = mongoose.get('url');



//App Routes
app.use('/v1/authenticate-admin',adminAuthenticate);
app.use('/v1/admin',admin);
app.use('/v1/school',school);
app.get('/', (req,res)=> {
        //To be redirected to help page or swagger page
		res.redirect('/v1/authenticate-admin/unauthorized');

});


mongoose.connect(mongDBURL,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Connected to ' + mongDBURL);
    }
    });

module.exports = app;