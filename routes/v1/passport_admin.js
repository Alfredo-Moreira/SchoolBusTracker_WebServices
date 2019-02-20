//Variables
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const config =require('../../config/config');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const adminModel = require('../../models/admin_model');
const functionUtil = require('../../helper-functions/functionsUtil');
const rollbar = require('../../helper-classes/rollbar');


//passport.use(new LocalStrategy(adminModel.authenticate()));

passport.use(new LocalStrategy(
  function(adminUsername, adminPassword, done) {
  return functionUtil.validateAdminUser(adminUsername,adminPassword,(err,user)=>{
        if(err){
            rollbar.logFailedLogin(adminUsername);
            return done(null,false);
        }
        if(user===null){
            rollbar.logFailedLogin(adminUsername);
            return done(null,false);
        } else {
            rollbar.logSuccessLogin(adminUsername);
            return done(null,user);
        }
    });
  }
));

passport.serializeUser(
    (user, done) =>{
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done)=> {
      functionUtil.compareID(id,(err,user)=>{
      done(err,user);
    });
  });

passport.use(new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey:config.session.secret,

    },(jwt_payload,done)=>{
        return adminModel.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return(err);
            }
            return done(null,user);
        })
    }));

module.exports = passport;