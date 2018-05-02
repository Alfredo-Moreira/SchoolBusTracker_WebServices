var express = require('express');
var passport = require('./passport');
var networkUtil = require('../../helper-functions/networkUtil');   
var router = express.Router();

router.post('/',passport.authenticate('localapikey',{session:true,failureRedirect:"../authenticate/unauthorized"}),(req,res,next)=>{    
    networkUtil.onAuthorizedUser(res);
});

router.get('/unauthorized',(req,res,next)=>{
   networkUtil.onUnauthorizedUser(res);
});

module.exports = router;