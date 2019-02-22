//Variables
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const config =require('../../config/config');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const adminModel = require('../../models/admin_model');
const parentModel = require('../../models/parent_model');
const functionUtil = require('../../helper-functions/functionsUtil');
const rollbar = require('../../helper-classes/rollbar');



passport.use('Admin',new LocalStrategy(
  function(username, password,done) {
      return functionUtil.validateAdminUser(username,password,(err,user)=>{
            if(err){
                rollbar.logFailedLogin(username);
                return done(null,false);
            }
            if(user===null){
                rollbar.logFailedLogin(username);
                return done(null,false);
            } else {
                rollbar.logSuccessLogin(username);
                return done(null,user);
            }
        });
  }
));

passport.use('Parent',new LocalStrategy(
    function(username, password,done) {
        return functionUtil.validateParentUser(username,password,(err,user)=>{
              if(err){
                  rollbar.logFailedLogin(username);
                  return done(null,false);
              }
              if(user===null){
                  rollbar.logFailedLogin(username);
                  return done(null,false);
              } else {
                  rollbar.logSuccessLogin(username);
                  return done(null,user);
              }
          });
    }
  ));

passport.serializeUser(
    (user, done) =>{
    done(null, functionUtil.createSerializedUser(user));
  });
  
  passport.deserializeUser((key, done)=> {
    switch(key.role){
    case config.userRoles.admin:
    functionUtil.compareAdminID(key.id,(err,user)=>{
       done(err,user);
    });
    break;
    case config.userRoles.parent:
    functionUtil.compareParentID(key.id,(err,user)=>{
        done(err,user);
    });
    break;
}
  });

passport.use('admin-rule',new JWTStrategy({
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

    passport.use('parent-rule',new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey:config.session.secret,

    },(jwt_payload,done)=>{
        return parentModel.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return(err);
            }
            return done(null,user);
        })
    }));

module.exports = passport;