/** Eline Duarte

 03/10/2017


 Scan records model **/



//Variables 
 var config = require('./config/config');
 var mongoose = require('mongoose');
 var autoIncrement = require('mongoose-auto-increment');
 var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
 var moment = require('time-timezone');
 var dateFormat = moment().tz('UTC').format();
 autoIncrement.initialize(DBConnection);


 //Schema
 var StudentScan = new mongoose.Schema ({

  scanStudentId : {type: Number, required: true},
  scanBusId: {type: Number, requried: true},
  scanBusStopId:{type:Number,required:true},
  scanRouteId: {type: Number, required: true},
  scanDriverId: {type: Number, required: true},
  scanDate: {type: Date, format: dateFormat, default: Date.now()},
  scanLocationX: {type: Number, required: true},
  scanLocationY: {type: Number, required: true}
 });

 //Define model
 StudentScan.plugin(autoIncrement.plugin,'StudentScan');
 module.exports = mongoose.model('StudentScan',StudentScan);