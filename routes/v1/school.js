const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
school_model = require('../../models/school_model');

// ********* School Functions *************
//Add School
router.post('/schoolObject/add', passport.authenticate('admin-rule', { session: false }),(req,res)=>{ 
    obj = new school_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
router.get('/schoolObject/list', passport.authenticate('admin-rule', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(school_model,res);
});

//Find by Id
router.get('/schoolObject/:id', passport.authenticate('admin-rule', { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(school_model,params,res);
});

//Delete School
router.delete('/schoolObject/delete/:id',passport.authenticate('admin-rule',{session:false}),(req,res)=>{
    const params = {_id:req.params.id};
    mongooseUtil.deleteOne(school_model,params,res);
});

router.put('/schoolObject/:id',passport.authenticate('admin-rule',{session:false}),(req,res)=>{
    const id = req.params.id;
    obj = school_model(req.body);
    mongooseUtil.updateById(obj,id,req.body,res);
})



module.exports = router;