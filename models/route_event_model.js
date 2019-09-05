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

//TODO
//Schema
var Route_event = new mongoose.Schema({
    //route_event_
});

//Define Model
Route_event.plugin(autoIncrement.plugin,'RouteEvent');
module.exports = mongoose.model('RouteEvent',Route_event);