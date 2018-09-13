var express = require('express');
var passport = require('./passport_admin');
var networkUtil = require('../../helper-functions/networkUtil');   
var router = express.Router();

router.post('/',passport.authenticate('local'),(req,res)=>{
    networkUtil.onAuthorizedAdminUser(req,res)
});

router.get('/unauthorized',(req,res,next)=>{
   networkUtil.onUnauthorizedUser(res);
   next();
});

module.exports = router;