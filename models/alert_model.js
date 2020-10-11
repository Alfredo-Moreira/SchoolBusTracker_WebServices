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
var Alert = new mongoose.Schema({
    alertSchoolId:{type: Number, required:true},
    alertBusStopId:{type:Number, required:true},
    alertDriverId:{type:Number, require:true},
    alertChildId:{type:Number, required: true},
    alertParentNotifiedId:{type:[Number],required:true},
    alertMessage:{type:String, required:true},
    dateCreated:{type:Date, format: dateFormat, default: Date.now()},
});

//Define Model
Alert.plugin(autoIncrement.plugin,'Alert');
module.exports = mongoose.model('Alert',Alert);