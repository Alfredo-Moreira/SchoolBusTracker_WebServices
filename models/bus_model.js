/** Alfredo Moreira

	03/07/2017

	Bus Routes model **/


//Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//Schema
var Bus = new mongoose.Schema({
    busSchoolId:{type:Number, required:true},
    busRouteId:{type:Number, required:true},
    busDriverId:{type:Number, required:true},
    busCapacity:{type:Number, required:true},
    dateCreated:{type:Date, format: dateFormat, default: Date.now()},
    dateUpdated:{type:Date, format:dateFormat, default:Date.now()}
});

//Define Model
Bus.plugin(autoIncrement.plugin,'Bus');
module.exports = mongoose.model('Bus',Bus);