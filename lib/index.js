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


// Main host

if (process.env.SERVER_HOST !== 'http://127.0.0.1') {

    //HTTPS

    app.use(cors({
        origin: ['https://codefend.com', 'https://inx.codefend.com']
    }));
    const credentials = {
        key: fs.readFileSync('/etc/letsencrypt/live/inx.codefend.com/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/inx.codefend.com/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/inx.codefend.com/chain.pem')
    };
    httpsServer = https.createServer(credentials, app);
} else {

    //HTTP

    app.use(cors({
        origin: ['http://localhost:3000']
    }));
}

// DDOS Prevention
app.use(limiter);

// Settings
app.set('port', process.env.SERVER_PORT || 3001);
//app.set('trust proxy', true);
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