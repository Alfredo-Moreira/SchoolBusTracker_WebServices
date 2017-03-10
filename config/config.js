/** Created by Eline 

	3/7/2017

	**/



var config = {
	'mongoDB_connection_string':'mongodb://127.0.0.1/BusTrackerDB',
   
userRoles :{
	'admin': 0,
	'driver': 1,
	'parent': 2,
	'child': 3,
},
busRoutesTypes:{
	'pickUp' : 0,
	'dropOff' : 1
}
};

module.exports = config;
