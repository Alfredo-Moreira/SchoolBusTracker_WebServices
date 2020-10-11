var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

// Models needed
scan_model = require('../../models/scan_model');

// ********* Scan Functions *************
router.post('/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.save(new scan_model(req.body),res);
});

router.get('/list',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findAll(scan_model,res,'dateCreated');
});

router.get('/list/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAllOfOne(scan_model,res,req.params.field,req.params.value);
});

router.get('/info/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findOne(scan_model,res,req.params.field,req.params.value);
});

router.put('/update/:id',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.update(scan_model,res,req.params.id,req.body);
});

router.delete('/delete/:id',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.delete(scan_model,res,req.params.id);
});

module.exports = router;