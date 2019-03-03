var express = require('express');
var passport = require('./passport');
var networkUtil = require('../../helper-functions/networkUtil');   
var router = express.Router();

router.post('/admin/login',passport.authenticate('Admin','local'),(req,res)=>{
    networkUtil.onAuthorizedAdminUser(req,res)
});

router.post('/parent/login',passport.authenticate('Parent','local'),(req,res)=>{
    networkUtil.onAuthorizedAdminUser(req,res)
});

router.get('/unauthorized',(req,res,next)=>{
   networkUtil.onUnauthorizedUser(res);
   next();
});

module.exports = router;