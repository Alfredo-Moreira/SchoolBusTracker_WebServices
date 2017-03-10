/** Eline Duarte

	3/07/2017

	Parent Model**/

//Variables 
var config = require('./config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);

//Schema
var Parent = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.parent},
parentFirstName:{type: String, required:true},
parentLastName:{type: String, require : true},
parentEmail: {type : String, required:true},
parentPhoneNumber:{type:Number, required:true, min:10, max:10},
parentUsername:{type: String, required: true},
parentPassword: {type: String, require: true},
parentChildId:{type: Number, required:true},
parentGender: {type:String, required:true},
parentComments: {type:String, default:"No Comments"},
dateCreated: {type:Date, format:dateFormat, default:Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Parent.plugin(autoIncrement.plugin,'Parent');
module.exports = mongoose.model('Parent',Parent);