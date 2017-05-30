// routes/user.js

var express = require('express'),
	app		= express();
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

// Get the user profile
router.get('/', ensureLoggedIn, function(req, res, next) {
  console.log("USER ROUTE");
  res.render('user', {
  	user: req.user,
  	userProfile: JSON.stringify(req.user, null, '  ')
  });
});

module.exports = router;
