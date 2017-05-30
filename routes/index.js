// routes/index.js

var express = require('express'),
    app     = express();
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

// Render the login template
router.get('/login',
  function(req, res){
    res.render('login', { env: process.env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
  	console.log('CALLBACK ROUTE');
    console.log('req.user',req.user);
  	res.render('callback', {
      env: process.env,
      user: req.user,
    });
    // res.redirect(req.session.returnTo || '/user');
  });

module.exports = router;