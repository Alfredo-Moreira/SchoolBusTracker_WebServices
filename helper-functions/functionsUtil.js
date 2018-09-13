//Variables
const config = require('../config/config');
const adminModel = require('../models/admin_model');
const jwt = require('jsonwebtoken');


//functions variable
const functionUtil = {
    validUser:{id:config.apiInfo.secret_id,apiKey:config.apiInfo.apikey},

    validateAPIKey:function(apikey,fn){
        if(this.validUser.apiKey === apikey.apikey){
            return fn(null,this.validUser);
        }
        return fn(new Error("Invalid API Key"),null);
    },
    validateAdminUser:function(username,pass,fn){
        return adminModel.findOne({adminUsername:username},(err,user)=>{
            if (!user || err) {
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
    compareID:function(id,fn){
        return adminModel.findOne({_id:id},(err,user)=>{
            if (!user || err) {
                return fn(null, false, { message: 'Incorrect username' });
           }
           return fn(null, user,{
               message: 'Valid User'
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