//Mongoose helper functions

var networkUtil = require('./networkUtil');

var mongooseFunctions = {
    save:function(schemaObj,res){
        schemaObj.save(function(err){
            if(err){ 
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));//decodeMongooseError(err.code));
            }
            return networkUtil.onSuccess(res,"Data saved");
        })
    }


}

function decodeMongooseError(errorCode){
    switch (errorCode) {
        case 11000:
            return "Username is already taken!"
        default:
            return "Something went wrong, we apologize!"
    }
};

module.exports = mongooseFunctions;