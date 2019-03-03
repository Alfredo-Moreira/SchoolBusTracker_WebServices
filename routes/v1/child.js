const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
child_model = require('../../models/child_model');

// ********* Parent Functions *************
//Add School
router.post('/childUser/add', passport.authenticate('admin-rule', { session: false }),(req,res)=>{ 
    obj = new child_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
router.get('/childUser/list', passport.authenticate('admin-rule', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(child_model,res);
});
//Get List of parent 

//Find by Id
router.get('/childUser/:id', passport.authenticate(['parent-rule','admin-rule'], { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(child_model,params,res);
});

//Delete School
router.delete('/childUser/delete/:id',passport.authenticate('admin-rule',{session:false}),(req,res)=>{
    const params = {_id:req.params.id};
    mongooseUtil.deleteOne(child_model,params,res);
});

//Update child
router.put('/childUser/:id',passport.authenticate('admin-rule',{session:false}),(req,res)=>{
    const id = req.params.id;
    obj = child_model(req.body);
    mongooseUtil.updateById(obj,id,req.body,res);
})



module.exports = router;