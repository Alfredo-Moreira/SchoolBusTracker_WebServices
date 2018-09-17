/**
 * Created by AMoreira on 8/2/17.
 */
const httpStatus = require('http-status');
const functionUtil = require('../helper-functions/functionsUtil');


 const networkResponses = {

    onSuccess:function(res,data){
        res.status(httpStatus.OK);
        res.set("Content-Type","application/json");
        res.json({Status:httpStatus.OK,Code:httpStatus.OK,data:data});
        return res;
    },
    onError:function(res,err){
        //functionUtil.logErrors(tool,err);
        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
        res.set("Content-Type","application/json");
        res.json({Status:httpStatus.INTERNAL_SERVER_ERROR,Code:httpStatus.INTERNAL_SERVER_ERROR,Message:"Internal Server Error"});
        return res;
    },
    onBadRequest:function(res,tool,err){
        //functionUtil.logErrors(tool,err)
        res.set("Content-Type","application/json");
        res.status(httpStatus.BAD_REQUEST);
        res.json({Status:httpStatus.BAD_REQUEST,Code:httpStatus.BAD_REQUEST,Message:"Bad Request",Data:err});
        return res;
    },
    onNotFound:function(res,tool,err){
         //functionUtil.logErrors(tool,err)
         res.set("Content-Type","application/json");
         res.status(httpStatus.NOT_FOUND);
         res.json({Status:httpStatus.NOT_FOUND,Code:httpStatus.NOT_FOUND,Message:"Not Found",Data:err});
         return res;
    },
    onAuthorizedUser:function(res){
       res.status(httpStatus.OK)
       res.set("Content-Type","application/json");
       res.json({Status:httpStatus.OK,Code:httpStatus.OK,Message:"Authorized"});
       return res;

    },
    onAuthorizedAdminUser:function(req,res){
        res.status(httpStatus.OK)
        res.set("Content-Type","application/json");
        req.login(req.user,{session:false},(err)=>{
            if(err){
                this.onError(res,err)
            }
        })
        const token = functionUtil.generateSignedToken(req.user);
        res.json({Status:httpStatus.OK,Code:httpStatus.OK,data:token});
        return res;
 
     },
    onUnauthorizedUser:function(res){
        res.status(httpStatus.UNAUTHORIZED);
        res.set("Content-Type","application/json");
        res.json({Status:httpStatus.UNAUTHORIZED,Code:httpStatus.UNAUTHORIZED,Message:"Unauthorized User"});
        return res;
    }
    
 }

 module.exports = networkResponses;