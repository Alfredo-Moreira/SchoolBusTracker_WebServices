/** Eline Duarte

	03/07/2017

	Admin model **/


//Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//Schema
var Admin = new mongoose.Schema({
userRoleId: { type: Number, required:true, default:config.userRoles.admin},
adminFirstName: {type: String, required:true},
adminLastName: {type: String, require : true},
adminGender: {type:Number, required:true,min:0,max:1,},
adminEmail: {type:String, required:true},
adminUsername: {type:String, required:true, unique: true},
adminPassword: {type:String, required:true},
adminSchoolId: {type:Number, required:true},
dateCreated : {type:Date, format: dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});

// Ensure Password hashing
// pre                                                                                                                                                                         
Admin.pre('save', function(next) {
var adminUser = this;

// only hash the password if it has been modified (or is new)
if (!adminUser.isModified('adminPassword')) return next();

// generate a salt
bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(adminUser.adminPassword, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        adminUser.adminPassword = hash;
        next();
    });
});
});

Admin.methods.comparePassword = function(candidatePassword, fn) {
    bcrypt.compare(candidatePassword, this.adminPassword, function(err, isMatch) {
        if (err) return fn(err);
        fn(null, isMatch);
    });
};
     

//Define Model
Admin.plugin(autoIncrement.plugin,'Admin');
module.exports = mongoose.model('Admin',Admin);