const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
//Db setup

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on the Port:', port);
