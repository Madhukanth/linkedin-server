const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const router = require('./router');

const app = express();
//Db setup
mongoose.connect('mongodb://localhost/linkedin-sample');

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on the Port:', port);
