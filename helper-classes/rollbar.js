const Rollbar = require('rollbar');
const config =  require('../config/config');
const moment = require('./moment');
const rollbar = new Rollbar(config.rollbarConfig);

const logginFunct = {
    logError:function(log){
        rollbar.error(log)
    },
    logInfo:function(log){
        rollbar.info(log)
    },
    //Metrics
    logSuccessLogin:function(username){
        const log = "Username: "+username+" logged in at "+moment.getDate();
        rollbar.log(log);
    },
    logFailedLogin:function(username){
        const log = "Username: "+username+" failed to log in at "+moment.getDate();
        rollbar.log(log);
    }
}

module.exports = logginFunct;