/** Eline Duarte

	3/07/2017

	Parent Model**/

//Variables 

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var time = require('time-timezone');
var dateFormat = moment().tz('UTC').format();
autoIncrement.initialize(DBConnection);

//Schema
var Parent = new mongoose.Schema({

parentID:{type: Number, required: true},
parentEmail: {type : String, required:true};
parentUsername:{type: String, required: true},
parentPassword: {type: String, require: true}
parentName: [{first : {type: String, required:true}, last : {type: String, require : true}],
parentChild: [{first : {type: String, required:true}, last : {type: String, require : true}],
parentSex: {type:String, required:true},
parentComments: {type:String, default:"No Comments"},
dateCreated: {type:Date, format:dateFormat, default:Date.now();
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
};

//Define Model
Parent.plugin(autoIncrement.plugin,'Parent');
module.exports = mongoose.model('Parent',Parent);