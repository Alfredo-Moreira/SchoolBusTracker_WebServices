var express = require('express');
var passport = require('./passport');
var router = express.Router();
var mongooseUtil = require('../../helper-functions/mongooseUtil');
var unauthorized = "/v1/authenticate/unauthorized";

// Models needed
admin_model = require('../../models/admin_model');

// ********* Admin Functions *************
router.post('/add',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.save(new admin_model(req.body),res);
});

router.get('/list',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAll(admin_model,res,'adminLastName');
});

router.get('/list/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findAllOfOne(admin_model,res,req.params.field,req.params.value);
});

router.get('/info/:field/:value',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.findOne(admin_model,res,req.params.field,req.params.value);
});

router.put('/update/:id',passport.authenticationMiddleware(),(req,res,next)=>{    
    mongooseUtil.update(admin_model,res,req.params.id,req.body);
});

router.delete('/delete/:id',passport.authenticationMiddleware(),(req,res,next)=>{ 
    mongooseUtil.delete(admin_model,res,req.params.id);
});

router.post('/login',passport.authenticationMiddleware(),(req,res,next)=>{
     mongooseUtil.login(admin_model,res,'adminUsername',req.body.username,req.body.password);
});

module.exports = router;