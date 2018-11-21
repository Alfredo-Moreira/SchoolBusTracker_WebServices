const mongooseConnetion = require('mongoose');
const config = require('./config/config');
const isDev = process.env.NODE_ENV === config.apiInfo.dev
const mongoDBConnection = isDev ? config.mongoDBConnection.mongoDB_connection_string:config.mongoDBConnection.mongoDB_connection_string_test 

mongooseConnetion.set('url',mongoDBConnection);

module.exports = mongooseConnetion;