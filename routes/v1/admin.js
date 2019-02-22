const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
admin_model = require('../../models/admin_model');

// ********* Admin Functions *************
//Add User
//passport.authenticate('jwt', { session: false })
router.post('/adminUser/add',passport.authenticate('admin-rule', { session: false }),(req,res)=>{ 
    obj = new admin_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
//passport.authenticate('jwt', { session: false })
router.get('/adminUser/list',passport.authenticate('admin-rule', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(admin_model,res);
});

//Find by Id
router.get('/adminUser/:id', passport.authenticate('admin-rule', { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(admin_model,params,res);
});

router.delete('/adminUser/:id', passport.authenticate('admin-rule', { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.deleteOne(admin_model,params,res);
})





module.exports = router;