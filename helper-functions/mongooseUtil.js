//Mongoose helper functions

const networkUtil = require('./networkUtil');
const rollbar = require('../helper-classes/rollbar');

const mongooseFunctions = {
    save:function(schemaObj,res){
        schemaObj.save((err)=>{
            
            if(err){ 
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));//decodeMongooseError(err.code));
            }
            return networkUtil.onSuccess(res,"Data saved");
        })
    },
    findAll:function(schemaObj,res){
        schemaObj.find({},(err,docs)=>{
            if(err){
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));
            }
            if(docs==null){
                return networkUtil.onNotFound(res,null,"Data not found");
            }
            return networkUtil.onSuccess(res,docs);
        });
    },
    findByParams:function(schemaObj,params,res){

        schemaObj.findOne(params,(err,docs)=>{
            if(err){
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));
            }
            if(docs==null){
                return networkUtil.onNotFound(res,null,"Data not found");
            }
            return networkUtil.onSuccess(res,docs);
        });
    },
    deleteOne:function(schemaObj,params,res){

        schemaObj.deleteOne(params,(err,docs)=>{
            if(err){
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));
            }
            if(docs==null){
                return networkUtil.onNotFound(res,null,"Data not found");
            }
            return networkUtil.onSuccess(res,"Data Deleted");
        });
    },
    updateById:function(schemaObj,id,params,res){

        schemaObj.update({_id:id},params,(err,docs)=>{
            if(err){
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));
            }
            if(docs==null){
                return networkUtil.onNotFound(res,null,"Data not found");
            }
            return networkUtil.onSuccess(res,"Data Updated");
        });
    }


}

function decodeMongooseError(errorCode){
    switch (errorCode) {
        case 11000:
            rollbar.logInfo("Username already taken");
            return "Username is already taken!"
        default:
            rollbar.logError("Something went wrong in the mongoose with code: "+errorCode);
            return "Something went wrong, we apologize!"
    }
};

module.exports = mongooseFunctions;