

// 3/17/2017
//Libraries
const express = require ('express');
const helmet =  require('helmet');
const mongoose = require('./mongoose');
const favicon = require('serve-favicon');
const path = require('path');

//JS Files
const config = require('./config/config');
const passport = require('./routes/v1/passport');
const rollback =  require('./helper-classes/rollbar');
const date =  require('./helper-classes/moment');



var port;
var hostURL;

//Environment Variables
const env = process.env.ENV;
switch(env){
    case 'Debug':
    port = 8000;
    hostURL = config.url.debug;
    break;
    case 'Test':
    port = 8000;
    hostURL = config.url.test;
    break;
    case 'Development':
    port = process.env.PORT;
    hostURL = config.url.development;
    break;
    case 'Production':
    port = process.env.PORT;
    hostURL = config.url.production;
    break;
    default:
    rollback.logError("Wrong environment set up")
    break;
}

//Instantiate Application
var app = express();

//Define Routes
const authenticate = require('./routes/v1/authenticate');
const admin = require('./routes/v1/admin');
const school = require('./routes/v1/school');
const parent = require('./routes/v1/parent');
const child = require('./routes/v1/child');

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
app.set('view engine', 'pug')

//Connection URL
const mongDBURL = mongoose.get('url');

//App Routes
app.use('/v1/authenticate',authenticate);
app.use('/v1/admin',admin);
app.use('/v1/school',school);
app.use('/v1/parent',parent);
app.use('/v1/child',child);
app.use(favicon(path.join(__dirname,'favicon','favicon.ico')));
app.get('/', (req,res)=> {
        //To be redirected to help page or swagger page
		res.redirect('/v1/authenticate/unauthorized');
});

//App Views
app.get('/version',(req,res)=>{
res.render('version',{
    version:config.apiInfo.version,
    build:config.apiInfo.Build,
    env:process.env.ENV});
});
app.get('/about',(req,res)=>{
    res.render('about'),{
        aboutURL:hostURL+':'+port+'/about',
        versionURL:hostURL+':'+port+'/version',
    };
    });

mongoose.connect(mongDBURL,(err)=>{
    if(err){
        rollback.logError(err)
    }else{
        console.log('Server connected on host: '+hostURL+':'+port+' on DB:'+mongDBURL+' at '+date.getDate())
        rollback.logInfo('Server connected on host: '+hostURL+':'+port+' on DB:'+mongDBURL+' at '+date.getDate());
    }
});

module.exports = app;