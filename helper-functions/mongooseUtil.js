//Mongoose helper functions

var networkUtil = require('./networkUtil');

var mongooseFunctions = {

    //*********************** General Functions ************************

    save:function(schemaObj,res){
        schemaObj.save(function(err){
            if(err){
                console.log(err); 
                return networkUtil.onBadRequest(res,null,decodeMongooseError(err.code));//decodeMongooseError(err.code));
            }
            return networkUtil.onSuccess(res,"Data saved");
        });
    },

    findAll:(function(schemaObj,res,sort){
        
        schemaObj.find().sort(sort).exec((err,data)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,data);
        });
    }),

    findUserInfo:(function(schemaObj,res,id,field){
        console.log(id);
        console.log(field);
        console.log('I got here')
        schemaObj.findOne({_id:id},[field]).exec((err,data)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,data);
        });
    }),

    findAllOfOne:(function(schemaObj,res,field,value){
    
        schemaObj.find({[field]:value}).sort(field).exec((err,data)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,data);
        });
    }),

    findOne:(function(schemaObj,res,field,value){

        schemaObj.findOne({[field]:value}).exec((err,data)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,data);
        });
    }),

    update:(function(schemaObj,res,id,data){
        
        schemaObj.findByIdAndUpdate(id,{$set:data},{new:true},(err,updatedData)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,updatedData);
        })
    }),

    delete:(function(schemaObj,res,id){
        schemaObj.findByIdAndRemove({_id:id}).exec((err,data)=>{
            if(err) {
                return networkUtil.onError(res,null,err);
            }
            return networkUtil.onSuccess(res,"Data deleted");
        });
    }),

   //************************ Unique functions ************************ 

   login:(function(schemaObj,res,userField,username,password){
       schemaObj.findOne({[userField]:username},(err,user)=>{
           if(err){
               return networkUtil.onBadRequest(res,null,err);
           }
           user.comparePassword(password,(err,isMatch)=>{
                if(err) {
                   return networkUtil.onError(res,null,err);
                }
                if(isMatch){
                    return networkUtil.onSuccess(res,user);
                } else {
                    return networkUtil.onUnauthorizedUser(res);
                }
                

           })
       })
   })

}
function decodeMongooseError(errorCode){
    console.log(errorCode);
    switch (errorCode) {
        case 11000:
            return "Username is already taken!"
            break;
        default:
            return "Something went wrong, we apologize!"
            break;
    }
};

module.exports = mongooseFunctions;