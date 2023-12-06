//Initialization
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const requestIp = require('request-ip');
const http = require('http');
const https = require('https');
const path = require('path');
const {limiter} = require('./modules/limiter');

// Initializations
const app = express();

var httpsServer = http.createServer(app);

app.use(cors({
    origin: ['*']
}));

app.use(limiter);

// Settings
app.set('port', process.env.SERVER_PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIp.mw());

// Server init
httpsServer.listen(app.get('port'), () => {
    console.log('Running on port: ', app.get('port'));
    console.log('Node version is: ' + process.version);
});

// Components & models
//require('./database');
app.use(require('./routes/intel'));