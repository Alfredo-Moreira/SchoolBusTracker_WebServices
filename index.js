

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
const admin = require('./routes/v1/admin');
const driver = require('./routes/v1/driver');
const parent = require('./routes/v1/parent');
const child = require('./routes/v1/child');
const alert = require('./routes/v1/alert');
const bus = require('./routes/v1/bus');
const bus_route = require('./routes/v1/bus_route');
const bus_stop = required('./routes/v1/bus_stop');
const school = require('./routes/v1/school');
const route_event = require('./routes/v1/route_event');
const scan = require('./routes/v1/scan');


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
app.use('/v1/admin',admin);
app.use('/v1/driver',driver);
app.use('/v1/parent',parent);
app.use('/v1/child',child);
app.use('/v1/bus',bus);
app.use('/v1/busroute',bus_route);
app.use('/v1/school',school);
app.use('/v1/alert',alert);
app.use('/v1/busstop',bus_stop);
app.use('/v1/routeevent',route_event);
app.use('/v1/scan',scan);


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