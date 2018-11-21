const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
school_model = require('../../models/school_model');

// ********* School Functions *************
//Add School
router.post('/school/add', passport.authenticate('jwt', { session: false }),(req,res)=>{ 
    obj = new school_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
router.get('/school/list', passport.authenticate('jwt', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(school_model,res);
});

//Find by Id
router.get('/school/:id', passport.authenticate('jwt', { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(school_model,params,res);
});

//Delete School
router.delete('/school/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const params = {_id:req.params.id};
    mongooseUtil.deleteOne(school_model,params,res);
});

router.put('/school/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const id = req.params.id;
    obj = school_model(req.body);
    mongooseUtil.updateById(obj,id,obj,res);
})



module.exports = router;