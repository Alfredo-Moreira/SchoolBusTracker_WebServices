/** Eline Duarte

 	3/7/2017

 	child model **/




//Variables 
var config = require('./config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var time = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);

//Schema
var Child = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.child},
childFirstName:{type: String, required:true},
childLastName:{type: String, required:true}],
childAge: {type:Number, required:true},
childGrade: {type:Number, required:true},
childGender: {type:String, required:true},
childParentId: {type:[Number], required:true},
childSchoolId: {type:Number, required:true},
childRouteId: {type:Number, required:true},
childBustStop:{type:Number, required:true},
childComments: {type:String, default:"No Comments"},
dateCreated: {type:Date, format:dateFormat, default:Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Child.plugin(autoIncrement.plugin,'child');
module.exports = mongoose.model('child',Child);