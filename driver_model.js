/** Eline Duarte

  3/07/2017 

  Driver Model**/


  //Variables 

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var time = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);



//Schema
var Driver = new mongoose.Schema({

driverID:{type: Number, required: true},
driverEmail: {type : String, required:true};
driverUsername:{type: String, required: true},
driverPassword: {type: String, require: true}
driverName: [{first : {type: String, required:true}, last : {type: String, require : true}],
driverAge: {type:Number, required:true},
driverSex: {type:String, required:true},
driverBus: {type: Number, required: true},
driverComments: {type:String, default:"No Comments"},
dateCreated: { type: Date, format : dateFormat, default: Date.now()};
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};


//Define Model
Driver.plugin(autoIncrement.plugin,'Driver');
module.exports = mongoose.model('Driver',Driver);


