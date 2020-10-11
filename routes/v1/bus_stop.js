var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

// Models needed
bus_stop_model = require('../../models/bus_stop_model');

// ********* Bus Stop Functions *************
router.post('/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.save(new bus_stop_model(req.body),res);
});

router.get('/list',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findAll(bus_stop_model,res,'dateCreated');
});

router.get('/list/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAllOfOne(bus_stop_model,res,req.params.field,req.params.value);
});

router.get('/info/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.findOne(bus_stop_model,res,req.params.field,req.params.value);
});

router.put('/update/:id',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.update(bus_stop_model,res,req.params.id,req.body);
});

router.delete('/delete/:id',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.delete(bus_stop_model,res,req.params.id);
});

module.exports = router;