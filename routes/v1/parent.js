const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
parent_model = require('../../models/parent_model');

// ********* Parent Functions *************
//Add School
router.post('/parentUser/add', passport.authenticate('admin-rule', { session: false }),(req,res)=>{ 
    obj = new parent_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
router.get('/parentUser/list', passport.authenticate('admin-rule', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(parent_model,res);
});
//Get List of parent 

//Find by Id
router.get('/parentUser/:id', passport.authenticate(['admin-rule','parent-rule'], { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(parent_model,params,res);
});

//Delete School
router.delete('/parentUser/delete/:id',passport.authenticate(['admin-rule','parent-rule'],{session:false}),(req,res)=>{
    const params = {_id:req.params.id};
    mongooseUtil.deleteOne(parent_model,params,res);
});

router.put('/parentUser/:id',passport.authenticate(['admin-rule','parent-rule'],{session:false}),(req,res)=>{
    const id = req.params.id;
    obj = parent_model(req.body);
    mongooseUtil.updateById(obj,id,req.body,res);
});

//TODO get child from parent profile



module.exports = router;