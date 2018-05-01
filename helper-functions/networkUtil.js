/**
 * Created by AMoreira on 8/2/17.
 */

var functionUtil = require('./functionsUtil');
var httpStatus = require('http-status');

 var networkResponses = {

    onSuccess:function(res,data){
        res.status(httpStatus.OK);
        res.set("Content-Type","application/json");
        res.json({Status:httpStatus.OK,Code:httpStatus.OK,data:data});
        return res;
    },
    onError:function(res,tool,err){
        //functionUtil.logErrors(tool,err);
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
    onAuthorizedUser:function(res){
       res.status(httpStatus.OK)
       res.set("Content-Type","application/json");
       res.json({Status:httpStatus.OK,Code:httpStatus.OK,Message:"Authorized"});
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