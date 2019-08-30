const seeder = require('mongoose-seed');
const config = require('../config/config.js');
const seedData = require('./seed-data.js');

//Models
const school = 'models/school_model.js'
const admin = 'models/admin_model.js'
const parent = 'models/parent_model.js'
const driver = 'models/driver_model.js'


// Connect to MongoDB via Mongoose
seeder.connect(config.mongoDBConnection.mongoDB_connection_string_Debug, function() {

  // Load Mongoose models
  seeder.loadModels([
    school,
    admin,
    parent,
    driver
  ]);

 // Clear specified collections
 seeder.clearModels(['School','Admin','Parent','Driver'], function() {

  // Callback to populate DB once collections have been cleared
  seeder.populateModels(seedData, function() {
    seeder.disconnect();
  });

});
});


// Data array containing seed data - documents organized by Model
