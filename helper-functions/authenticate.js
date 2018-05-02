//Validates the user
var httpStatus = require('http-status');

function authenticationMiddleware() {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.status(httpStatus.UNAUTHORIZED).json({Status:httpStatus.UNAUTHORIZED,Code:httpStatus.UNAUTHORIZED,Message:"Unauthorized User"});
  }
}

module.exports = authenticationMiddleware;
