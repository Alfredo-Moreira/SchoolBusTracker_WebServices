const seeder = require('mongoose-seed');
const config = require('../config/config');
const seedData = require('./seed-data');

//Models
school = 'models/school_model.js'
admin = 'models/admin_model.js'
parent = 'models/parent_model.js'


// Connect to MongoDB via Mongoose
seeder.connect(config.mongoDBConnection.mongoDB_connection_string_Debug, function() {

  // Load Mongoose models
  seeder.loadModels([
    school,
    admin,
    parent
  ]);

 // Clear specified collections
 seeder.clearModels(['School','Admin','Parent'], function() {

  // Callback to populate DB once collections have been cleared
  seeder.populateModels(seedData, function() {
    seeder.disconnect();
  });

});
});

// Data array containing seed data - documents organized by Model
