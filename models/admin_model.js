/** Eline Duarte

	03/07/2017

	Admin model **/


//Variables 
var config = require('./config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
//var integerValidator = require('mongoose-integer');
autoIncrement.initialize(DBConnection);

//Schema
var Admin = new mongoose.Schema({
userRoleId: { type: Number, required:true, default:config.userRoles.admin},
adminFirstName: {type: String, required:true},
adminLastName: {type: String, require : true},
adminGender: {type:String, required:true},
adminEmail: {type:String, required:true},
adminUsername: {type:String, required:true},
adminpassword: {type:String, required:true},
adminSchoolId: {type:Number, required:true},
dateCreated : {type:Date, format: dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Admin.plugin(autoIncrement.plugin,'Admin');
module.exports = mongoose.model('Admin',Admin);