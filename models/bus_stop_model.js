/** Eline Duarte

 03/10/2017


 bus stop model **/


//Variables 
 var config = require('../config/config');
 var mongoose = require('mongoose');
 var autoIncrement = require('mongoose-auto-increment');
 var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
 var moment = require('moment');
 var dateFormat = moment().utc().format();
 autoIncrement.initialize(DBConnection);


 //Schema
var BusStop = new mongoose.Schema ({
	
 stopAddress: {type: String, required: true},
 stopLocation: {type:{type:String}, coordinate:[], required: true},
 stopTotalStudents: {type: Number, require: true},
 stopAssignedStudentsIds: {type:[Number],required:true},
 stopBusRouteId: {type:Number,required:true},
 dateCreated: {type:Date, format:dateFormat, default:Date.now()},
 dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});

//Define model
 BusStop.plugin(autoIncrement.plugin,'BusStop');
 module.exports = mongoose.model('BusStop',BusStop);


