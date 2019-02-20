/** Created by Eline 

	3/7/2017

	**/



var config = {
	
	apiInfo:{
        version:"1.0.0",
        Build:"10000000",
        dev:"development",
        secret_id:5032
    },
    session:{
        saveUninitialized: false, // no saved new sessions
        resave: false, // do not automatically write to the session store
        secret: "top_secret_key",
        cookie : {httpOnly:true,maxAge:86400}
    },
    url:{
        debug:"localhost",
        development:"Development URL TODO",
        test:"localhost",
        production:"Production URL TODO"
    },
    mongoDBConnection:{
        mongoDB_connection_string_test:'mongodb://localhost/BusTrackerDB_Test',
        mongoDB_connection_string_Dev:'mongodb://localhost/BusTrackerDB_Dev',
        mongoDB_connection_string_Debug:'mongodb://localhost/BusTrackerDB_Debug',
        mongoDB_connection_string_Prod:'mongodb://localhost/BusTrackerDB'
},
rollbarConfig:{
    accessToken: '55350a183bbb4dd58a7cba68b56d7e78',
    captureUncaught: true,
    captureUnhandledRejections: true
  },
   
userRoles :{
	'admin': 0,
	'driver': 1,
	'parent': 2,
	'child': 3,
},
busRoutesTypes:{
	 'pickUp' : 0,
	 'dropOff' : 1,
	 'trip' : 3
}
};

module.exports = config;
