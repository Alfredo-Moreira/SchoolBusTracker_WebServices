

var config = require('../config/config');


//functions variable
var functionUtil = {
    validUser:{id:config.apiInfo.secret_id,apiKey:config.apiInfo.apikey},

    validateAPIKey:function(apikey,fn){
        if(this.validUser.apiKey === apikey.apikey){
            return fn(null,this.validUser);
        }
        return fn(new Error("Invalid API Key"),null);
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