// Define global variables
global.rootRequire = function (name) {
  return require(__dirname + '/' + name);
}

var express 		 = require('express'),
	  app 	  		 = express(),
	  router 		 = express.Router(),
	  bodyParser	 = require('body-parser'),
      cookieParser   = require('cookie-parser'),
	  passport  	 = require('passport'),
	  Auth0Strategy  = require('passport-auth0'),
	  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');

var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, {
    	profile: profile,
    	extraParams: extraParams
    });
  });

// Support JSON-encoded bodies
app.use(bodyParser.json({
  limit: '5mb'
}));
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
// Parse cookies
app.use(cookieParser());
// Parse request params like in Express 3.0
app.use( require('request-param')() );
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

var user = require('./routes/user');
var index = require('./routes/index');

app.use('/user',user);
app.use('/',index);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});