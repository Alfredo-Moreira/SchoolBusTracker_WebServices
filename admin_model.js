/** Eline Duarte

	03/07/2017

	Admin model **/


//Variables 

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var time = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
//var integerValidator = require('mongoose-integer');
autoIncrement.initialize(DBConnection);


//Schema
var Admin = new mongoose.Schema({

adminID: {type: String, required:true};
adminName: [{first : {type: String, required:true}, last : {type: String, require : true}],
adminEmail: {type : String, required:true};
adminUsername: {type : String},
adminpassword: {type : String},
adminRole: { type: integer},
adminSex: {type:String, required:true},
dateCreated :{type: Date, format: dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Admin.plugin(autoIncrement.plugin,'Admin');
module.exports = mongoose.model('Admin',Admin);