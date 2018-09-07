var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

var obj;

// Models needed
admin_model = require('../../models/admin_model');

// ********* Admin Functions *************
router.post('/admin/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    obj = new admin_model(req.body);
    mongooseUtil.save(obj,res);
    next();
});

router.get('/admin/list',passport.authenticationMiddleware(),(req,res,next)=>{    
res.send("get list");
next()
});






module.exports = router;