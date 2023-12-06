//Initialization
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');
const http = require('http');
const path = require('path');

// Initializations
const app = express();

var httpsServer = http.createServer(app);

app.use(cors({
    origin: ['*']
}));

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