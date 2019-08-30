//Mongoose helper functions

const networkUtil = require('./networkUtil');

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

        schemaObj.findByIdAndUpdate(id,params,(err,docs)=>{
            if(err){
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));
            }
            if(docs==null){
                return networkUtil.onNotFound(res,null,"Data not found");
            }
            return networkUtil.onSuccess(res,docs);
        });
    }


}

function decodeMongooseError(errorCode){
    switch (errorCode) {
        case 11000:
            return "Username is already taken!"
        default:
            return "Something went wrong, we apologize!"
    }
}

module.exports = mongooseFunctions;