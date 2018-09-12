//Variables
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const funtionUtil = require('../../helper-functions/functionsUtil')
const authenticationMiddleware = require('../../helper-functions/authenticate');

passport.use(new LocalStrategy(
  function(username, password, done) {
    funtionUtil.validateAdminUser({username:username,pass:password},(err,user)=>{
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
    });
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