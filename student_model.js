/** Eline Duarte

 	3/7/2017

 	Student model **/




//Variables 

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var time = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);

//Schema
var Student = new mongoose.Schema({

studentName: [{first : {type: String, required:true}, last : {type: String, required:true}],
studentAge: {type:Number, required:true},
studentGrade: {type:Number, required:true},
studentSex: {type:String, required:true},
studentComments: {type:String, default:"No Comments"},
dateCreated: {type:Date, format:dateFormat, default:Date.now();
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Student.plugin(autoIncrement.plugin,'Student');
module.exports = mongoose.model('Student',Student);