const mongooseConnetion = require('mongoose');
const config = require('./config/config');

//Environment Variables
const env = process.env.ENV;
var mongoDBConnection;
switch(env){
    case 'Debug':
    mongoDBConnection= config.mongoDBConnection.mongoDB_connection_string_Debug;
    break;
    case 'Test':
    mongoDBConnection=config.mongoDBConnection.mongoDB_connection_string_test;
    break;
    case 'Development':
    mongoDBConnection=config.mongoDBConnection.mongoDB_connection_string_Dev;
    break;
    case 'Production':
    mongoDBConnection=config.mongoDBConnection.mongoDB_connection_string_Prod;
    break;
}
mongooseConnetion.set('url',mongoDBConnection);

module.exports = mongooseConnetion;