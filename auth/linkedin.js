var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

var User = require('../models/user');
var init = require('./init');

passport.use(
  new LinkedInStrategy(
    {
      consumerKey: '81rwb9nl6e7dgn',
      consumerSecret: 'hOJmVsLM3WY5B0g0',
      callbackURL:
        'https://secure-reaches-84828.herokuapp.com/auth/linkedin/callback'
    },
    function(token, tokenSecret, profile, done) {
      var searchQuery = {
        name: profile.displayName
      };

      var updates = {
        name: profile.displayName,
        someID: profile.id,
        provider: profile.provider
      };

      var options = {
        upsert: true
      };

      // update the user if s/he exists or add a new user
      User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

// serialize user into the session
init();

module.exports = passport;
