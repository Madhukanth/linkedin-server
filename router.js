module.exports = app => {
  app.get('/auth/linkedin/callback', function(req, res) {
    var request = require('request');
    var jwtDecode = require('jwt-decode');
    var querystring = require('querystring');
    var options = {
      method: 'POST',
      url: 'https://madhu051196.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: {
        grant_type: 'authorization_code',
        client_id: 'R7q5KY4SECsEcqZ4v4bjL9uqGjNXuwZd',
        client_secret:
          '5r-6ap-9rLmJQusrpZIVoTSyKXodJvC8-Z7fEeB_9t3lHG4Z-bsrfIeIfekHAKhc',
        code: req.query.code,
        redirect_uri: 'http://192.168.43.20:3090/auth/linkedin/callback'
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      var decoded = jwtDecode(body.id_token);
      var details = querystring.stringify(decoded);
      res.redirect('http://192.168.43.20:3000/profile?' + details);
    });
  });
};
