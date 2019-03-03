//Variables
const config = require('../config/config');
const adminModel = require('../models/admin_model');
const parentModel = require('../models/parent_model');
const jwt = require('jsonwebtoken');
const rollback = require('../helper-classes/rollbar');



//functions variable
const functionUtil = {
    validateAdminUser:function(username,pass,fn){
        return adminModel.findOne({adminUsername:username},(err,user)=>{
            if (!user || err) {
                 rollback.logFailedLogin(username)
                 return fn(null, false, { message: 'Incorrect username' });
            }
            user.comparePassword(pass,(err,isMatch)=>{
                if (err){
                    return fn(null, false, { message:err.message });
                }
                if(isMatch){
                    return fn(null, user,{
                    message: 'Successful Login'
            })}else{
                return fn(null, false, { message: 'Incorrect password' });
            }
        });
          });
    },
    validateParentUser:function(username,pass,fn){
        return parentModel.findOne({parentUsername:username},(err,user)=>{
            if (!user || err) {
                 rollback.logFailedLogin(username)
                 return fn(null, false, { message: 'Incorrect username' });
            }
            user.comparePassword(pass,(err,isMatch)=>{
                if (err){
                    return fn(null, false, { message:err.message });
                }
                if(isMatch){
                    return fn(null, user,{
                    message: 'Successful Login'
            })}else{
                return fn(null, false, { message: 'Incorrect password' });
            }
        });
          });
    },
    createSerializedUser:function(user){
        return {
            id:user._id,
            role: user.userRoleId
        }
    },
    compareAdminID:function(id,fn){
        return adminModel.findOne({_id:id},(err,user)=>{
            if (!user || err) {
                return fn(null, false, { message: 'Incorrect username' });
           }
           return fn(null, user,{
               message: 'Valid Admin User'
           });
         });
   },
   compareParentID:function(id,fn){
    return parentModel.findOne({_id:id},(err,user)=>{
        if (!user || err) {
            return fn(null, false, { message: 'Incorrect username' });
       }
       console.log("Deserialize Paremt")
       return fn(null, user,{
           
           message: 'Valid Parent User'
       });
     });
},
   generateSignedToken:function(user){
        const token = jwt.sign(user.toJSON(),config.session.secret,{
            expiresIn: 86400 //1 day to be reduced
        });
        const response = {
            user_id: user._id,
            token:token
        }
        return response;
   }
}

module.exports =functionUtil;