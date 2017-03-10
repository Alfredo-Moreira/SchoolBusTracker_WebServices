/** Eline Duarte

  3/07/2017 

  Driver Model**/


  //Variables 
var config = require('./config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);



//Schema
var Driver = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.driver},
driverFirstName:{type: String, required:true}, 
driverLastName:{type: String, require : true},
driverEmail: {type : String, required:true},
driverAddress:{type: String,required:true},
driverPhoneNumber:{type:String, required:true, min:10, max:10},
driverUsername:{type: String, required: true},
driverPassword: {type: String, require: true},
driverAge: {type:Number, required:true},
driverGender: {type:String, required:true},
driverBusId: {type: Number, required: true},
driverSchoolId:{type:Number,required:true},
driverRouteId:{type:[Number],required:true}, //driver can have multiple routes
driverComments: {type:String, default:"No Comments"},
dateCreated: { type: Date, format : dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};


//Define Model
Driver.plugin(autoIncrement.plugin,'Driver');
module.exports = mongoose.model('Driver',Driver);


