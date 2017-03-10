/** Eline Duarte

 03/10/2017


 Bus stop model **/


//Variables 
 var config = require('./config/config');
 var mongoose = require('mongoose');
 var autoIncrement = require('mongoose-auto-increment');
 var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
 var moment = require('time-timezone');
 var dateFormat = moment().tz('UTC').format();
 autoIncrement.initialize(DBConnection);


 //Schema
var BusStop = new mongoose.Schema ({
	
 stopNumber : {type: Number, required: true},
 stopAddress: {type: String, required: true},
 stopLocation: {type: [Number], required: true},
 stopTotalStudents: {type: Number, require: true},
 stopAssignedStudents: {type:[Number],required:true},

});

//Define model
 BusStop.plugin(autoIncrement.plugin,'BusStop');
 module.exports = mongoose.model('BusStop',BusStop);


