/** Alfredo Moreira

	03/07/2017

	School model **/


//Variables 
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//Schema
var School = new mongoose.Schema({
schoolName: { type: String, required:true},
schoolAddress:{type: String, required:true},
schoolPhoneNumber:{type:String, required:true, minlength:10,maxlength:10},
schoolDriversTotalNumber:{type: Number, require : true, default: 0},
schoolChildTotalNumber: {type:Number, required:true, default: 0},
schoolBusRoutesTotalNumber: {type:Number, required:true, default: 0},
dateCreated :{type: Date, format: dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});

//Define Model
School.plugin(autoIncrement.plugin,'School');
module.exports = mongoose.model('School',School);