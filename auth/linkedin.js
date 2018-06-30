var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

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
      return done(null, user);
    }
  )
);

// serialize user into the session
init();

module.exports = passport;
