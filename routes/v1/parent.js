var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

// Models needed
parent_model = require('../../models/parent_model');

// ********* Parent Functions *************
router.post('/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.save(new parent_model(req.body),res);
});

router.get('/list',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findAll(parent_model,res,'parentLastName');
});

router.get('/list/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAllOfOne(parent_model,res,req.params.field,req.params.value);
});

router.get('/info/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findOne(parent_model,res,req.params.field,req.params.value);
});

router.put('/update/:id',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.update(parent_model,res,req.params.id,req.body);
});

router.delete('/delete/:id',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.delete(parent_model,res,req.params.id);
});

router.post('/login',passport.authenticationMiddleware(),(req,res,next)=>{
     mongooseUtil.login(parent_model,res,'parentUsername',req.body.username,req.body.password);
});

router.get('/:id/getchild',passport.authenticationMiddleware(),(req,res,next)=>{
    mongooseUtil.findUserInfo(parent_model,res,req.params.id,'parentChildId');
});



module.exports = router;