// Components
const express = require('express');
const { searchIntelx, readIntelx } = require('../helpers/intel');

// Initializations
const router = express.Router();
require('dotenv').config();


// Functions

const findAndReturnIntel = async (req, res) => {
    const intel = await searchIntelx(req.body.main);
    return res.status(200).json({intel});
}

const readAndReturnIntel = async (req, res) => {
    const intel = await readIntelx(req.body.main);
    return res.status(200).json({intel});
}

/**
* @name POST Intel search
* @description Searches by the main params
* @route {POST} /v1/intel/findByUrl
* @response {200} OK
* @response {500} Internal error
* @responsebody {string} [code] internal_error
* @responsebody {string} [message] error description
*/

router.post('/v1/intel/findByUrl',
    findAndReturnIntel
);


/**
* @name POST Intel full view
* @description Read an entire document file
* @route {POST} /v1/intel/readByUrl
* @response {200} OK
* @response {500} Internal error
* @responsebody {string} [code] internal_error
* @responsebody {string} [message] error description
*/

router.post('/v1/intel/readByUrl',
    readAndReturnIntel
);

module.exports = router;
