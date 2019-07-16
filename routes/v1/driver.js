const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongooseUtil = require('../../helper-functions/mongooseUtil');

var obj;

// Models needed
driver_model = require('../../models/driver_model');

// ********* Parent Functions *************
//Add School
router.post('/driverUser/add', passport.authenticate('admin-rule', { session: false }),(req,res)=>{ 
    obj = new driver_model(req.body);
    mongooseUtil.save(obj,res);
});

//Get List
router.get('/driverUser/list', passport.authenticate('admin-rule', { session: false }),(req,res)=>{   
    mongooseUtil.findAll(driver_model,res);
});
//Get List of parent 

//Find by Id
router.get('/driverUser/:id', passport.authenticate(['admin-rule','driver-rule'], { session: false }),(req,res)=>{
    const params = {_id:req.params.id}; 
    mongooseUtil.findByParams(driver_model,params,res);
});

//Delete Driver
router.delete('/driverUser/delete/:id',passport.authenticate(['admin-rule','driver-rule'],{session:false}),(req,res)=>{
    const params = {_id:req.params.id};
    mongooseUtil.deleteOne(driver_model,params,res);
});

router.put('/driverUser/:id',passport.authenticate(['admin-rule','driver-rule'],{session:false}),(req,res)=>{
    const id = req.params.id;
    obj = driver_model(req.body);
    mongooseUtil.updateById(obj,id,req.body,res);
});



module.exports = router;