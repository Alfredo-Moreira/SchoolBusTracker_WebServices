
//Variables
var config = require('../../config/config')
var passport = require('passport');
var localAPIKeyStrategy = require('passport-localapikey').Strategy;
var functionUtil = require('../../helper-functions/functionsUtil');
var authenticationMiddleware = require('../../helper-functions/authenticate');

passport.use(new localAPIKeyStrategy(
 function (apikey,done){
     functionUtil.validateAPIKey({apikey:apikey},(err,user)=>{ 
         if(err){
             console.log('passport error');
             return done(null,false);
         }
         if(user===null){
             console.log('passport user null');
             return done(null,false);
         } else {
             return done(null,user);
         }
     })
 }   
));

passport.serializeUser(
    (user, done) =>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
      functionUtil.compareID(id,(err,user)=>{
      done(err,user);
    });
  });
  
  passport.authenticationMiddleware = authenticationMiddleware;
  
  
   module.exports = passport;
  