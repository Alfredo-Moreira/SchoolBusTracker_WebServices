/** Eline Duarte

  3/07/2017 

  Driver Model**/


  //Variables 
var config = require('../config/config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var autoIncrement = require('mongoose-auto-increment');
var DBConnection = mongoose.createConnection('mongodb://localhost/BusTrackerDB');
var moment = require('moment');
var dateFormat = moment().utc().format();
autoIncrement.initialize(DBConnection);

//States US array
const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

//Schema
var Driver = new mongoose.Schema({
userRoleId:{type: Number, required:true, default:config.userRoles.driver},
driverFirstName:{type: String, required:true}, 
driverLastName:{type: String, require : true},
driverEmail: {type : String, required:true},
driverAddress:{
        street: String,
        city: String,
        state: {
            type: String,
            uppercase: true,
            required: true,
            enum: statesArray
        },
        zip: Number,
        },
driverPhoneNumber:{type:String, required:true, minlength:10, maxlength:10},
driverUsername:{type: String, required: true,unique:true},
driverPassword: {type: String, require: true},
driverAge: {type:Number, required:true},
driverGender: {type:String, enum:["Male","Female"],required:true},
driverBusId: {type: [Number]},
driverSchoolId:{type:Number,required:true},
driverRouteId:{type:[Number]}, //driver can have multiple routes
driverComments: {type:String, default:"No Comments"},
dateCreated: { type: Date, format : dateFormat, default: Date.now()},
dateUpdated: {type:Date, format:dateFormat, default:Date.now()}
});

// Ensure Password hashing
// pre                                                                                                                                                                         
Driver.pre('save', function(next) {
  var driverUser = this;
  
  // only hash the password if it has been modified (or is new)
  if (!driverUser.isModified('driverPassword')) return next();
  
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
          if (err){
              return fn(err);
          }
          fn(null, isMatch);
      });
  };

//Define Model
Driver.plugin(autoIncrement.plugin,'Driver');
module.exports = mongoose.model('Driver',Driver);


