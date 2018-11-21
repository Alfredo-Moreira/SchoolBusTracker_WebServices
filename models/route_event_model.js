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

//TODO
//Schema
var Route_event = new mongoose.Schema({
    //route_event_
});

//Define Model
Route_event.plugin(autoIncrement.plugin,'Route_event');
module.exports = mongoose.model('Route_event',Route_event);