/** Eline Duarte

 03/10/2017


 record model **/



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

  scanStudent : {type: Number, required: true},
  scanBus: {type: Number, requried: true},
  scanRoute: {type: Number, required: true},
  scanDriver: {type: Number, required: true},
  scanDate: {type: Date, format: dateFormat, default: Date.now()},
  scanLocation: {type: Number, required: true}, // will be bus stop number


 });

 //Define model
 StudentScan.plugin(autoIncrement.plugin,'StudentScan');
 module.exports = mongoose.model('StudentScan',StudentScan);