var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

// Models needed
driver_model = require('../../models/driver_model');

// ********* Driver Functions *************
router.post('/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.save(new driver_model(req.body),res);
});

router.get('/list',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findAll(driver_model,res,'driverLastName');
});

router.get('/list/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAllOfOne(driver_model,res,req.params.field,req.params.value);
});

router.get('/info/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findOne(driver_model,res,req.params.field,req.params.value);
});

router.put('/update/:id',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.update(driver_model,res,req.params.id,req.body);
});

router.delete('/delete/:id',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.delete(driver_model,res,req.params.id);
});

router.post('/login',passport.authenticationMiddleware(),(req,res,next)=>{
     mongooseUtil.login(driver_model,res,'driverUsername',req.body.username,req.body.password);
});

router.get('/:id/routes',passport.authenticationMiddleware(),(req,res,next)=>{
    mongooseUtil.findUserInfo(driver_model,res,req.params.id,'driverRoutes');
});

module.exports = router;