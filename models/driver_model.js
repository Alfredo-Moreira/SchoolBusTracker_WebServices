/** Eline Duarte

  3/07/2017 

  Driver Model**/

  //NEED TO FIX MONGOOSE

  //Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var mongooseURL = require('../mongoose').get('url');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection(mongooseURL);
var bcrypt = require('bcrypt');

var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);



//Schema
var Driver = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.driver},
driverFirstName:{type: String, required:true}, 
driverLastName:{type: String, require : true},
driverEmail: {type : String},
driverAddress:{type: String,required:true},
driverPhoneNumber:{type:String, required:true, min:10, max:10},
driverUsername:{type: String, required: true},
driverPassword: {type: String, require: true},
driverAge: {type:Number, required:true},
driverGender: {type:Number, required:true,min:0,max:1},
driverBusId: {type: Number, required: true},
driverSchoolId:{type:Number,required:true},
driverRouteId:{type:[Number],required:true}, //driver can have multiple routes
driverComments: {type:String, default:"No Comments"},
dateCreated: { type: Date, format : dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});


// Ensure Password hashing
// pre                                                                                                                                                                         
Driver.pre('save', function(next) {
	var driverUser = this;
	
	// only hash the password if it has been modified (or is new)
	if (!driverUser.isModified('parentPassword')) return next();
	
	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
	
		// hash the password using our new salt
		bcrypt.hash(driverUser.driverPassword, salt, function(err, hash) {
			if (err) return next(err);
	
			// override the cleartext password with the hashed one
			driverUser.driverPassword = hash;
			next();
		});
	});
	});
	
	Driver.methods.comparePassword = function(candidatePassword, fn) {
		bcrypt.compare(candidatePassword, this.driverPassword, function(err, isMatch) {
			if (err) return fn(err);
			fn(null, isMatch);
		});
	};



//Define Model
Driver.plugin(autoIncrement.plugin,'Driver');
module.exports = mongoose.model('Driver',Driver);


