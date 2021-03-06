/** Alfredo Moreira

	03/07/2017

	Bus Routes model **/


//Variables 
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var mongooseURL = require('../mongoose').get('url');
var DBConnection = mongoose.createConnection(mongooseURL);
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
    dateCreated:{type:Date, format: dateFormat, default: Date.now()},
});

//Define Model
Alert.plugin(autoIncrement.plugin,'Alert');
module.exports = mongoose.model('Alert',Alert);