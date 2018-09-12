//Variables
const config = require('../config/config');
const adminModel = require('../models/admin_model');


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
        adminModel.findOne({ adminUsername: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
    },
    compareID:function(id,fn){
        if(this.validUser.id === id){
            return fn(null,this.validUser);
        } else{
        return fn(new Error("Invalid ID"),null);
    }
   }
}

module.exports =functionUtil;