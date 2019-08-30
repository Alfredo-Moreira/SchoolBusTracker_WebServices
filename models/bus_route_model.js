/** Alfredo Moreira

	03/07/2017

	Bus Routes model **/


//Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var mongooseURL = require('../mongoose').get('url');
var DBConnection = mongoose.createConnection(mongooseURL);
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//Schema
var BusRoute = new mongoose.Schema({
busRouteName: { type: String, required:true},
busRouteBusStopNumberTotal:{ type:Number, required:true},
busRouteType:{ type:Number, required:true},
dateCreated :{type: Date, format: dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});

//Define Model
BusRoute.plugin(autoIncrement.plugin,'BusRoute');
module.exports = mongoose.model('BusRoute',BusRoute);