module.exports = app => {
  var cors = require('cors');
  var corsOptions = {
    origin: 'https://calm-ravine-12452.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.get('/auth/linkedin/callback', function(req, res) {
    var request = require('request');
    var jwtDecode = require('jwt-decode');
    var querystring = require('query-string');
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
        redirect_uri:
          'https://secure-reaches-84828.herokuapp.com/auth/linkedin/callback'
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      var decoded = body.id_token;
      res.redirect(
        'https://calm-ravine-12452.herokuapp.com/profile/?details=' + decoded
      );
    });
  });

  app.post('/auth/linkedin/fetchuser', cors(corsOptions), function(req, res) {
    var jwtDecode = require('jwt-decode');
    var token = req.body.token;
    var details = jwtDecode(token);
    res.json({ details });
  });
};
