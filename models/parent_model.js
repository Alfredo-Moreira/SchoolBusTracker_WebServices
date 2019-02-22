/** Eline Duarte

	3/07/2017

	Parent Model**/

//Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var bcrypt = require('bcrypt');
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//Schema
var Parent = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.parent},
parentFirstName:{type: String, required:true},
parentLastName:{type: String, require : true},
parentEmail: {type : String, required:true},
parentPhoneNumber:{type:String, required:true, min:10, max:10},
parentUsername:{type: String, required: true, unique: true, min:3},
parentPassword: {type: String, require: true,min:5},
parentChildId:{type: [Number], required:true},
parentGender: {type:Number, required:true,min:0,max:1,},
parentComments: {type:String, default:"No Comments"},
dateCreated: {type:Date, format:dateFormat, default:Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});


// Ensure Password hashing
// pre                                                                                                                                                                         
Parent.pre('save', function(next) {
	var parentUser = this;
	
	// only hash the password if it has been modified (or is new)
	if (!parentUser.isModified('parentPassword')) return next();
	
	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
	
		// hash the password using our new salt
		bcrypt.hash(parentUser.parentPassword, salt, function(err, hash) {
			if (err) return next(err);
	
			// override the cleartext password with the hashed one
			parentUser.parentPassword = hash;
			next();
		});
	});
	});
	
	Parent.methods.comparePassword = function(candidatePassword, fn) {
		bcrypt.compare(candidatePassword, this.parentPassword, function(err, isMatch) {
			if (err) return fn(err);
			fn(null, isMatch);
		});
	};


//Define Model
Parent.plugin(autoIncrement.plugin,'Parent');
module.exports = mongoose.model('Parent',Parent);