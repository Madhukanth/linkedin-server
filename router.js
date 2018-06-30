var passportLinkedIn = require('./auth/linkedin');

module.exports = app => {
  app.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

  app.get(
    '/auth/linkedin/callback',
    passportLinkedIn.authenticate('linkedin'),
    function(req, res) {
      res.json(req.user);
    }
  );
};
