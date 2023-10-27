// Components
const express = require('express');
const { initSearchIntel, searchIntelx, searchPreview, readIntelx } = require('../helpers/intel');

// Initializations
const router = express.Router();
require('dotenv').config();


// Functions

const initialSearchIntel = async (req, res) => {
    const data = await initSearchIntel(req.body.main);
    return res.status(200).json(data);
}

const findAndReturnIntel = async (req, res) => {
    const intel = await searchIntelx(req.body.id, req.body.offset);
    return res.status(200).json({intel});
}

const findAndReturnPreview = async (req, res) => {
    const preview = await searchPreview(req.body.sid, req.body.bid, req.body.mid);
    return res.status(200).json({preview});
}

const readAndReturnIntel = async (req, res) => {
    const intel = await readIntelx(req.body.sid, req.body.bucket);
    return res.status(200).json({intel});
}

/**
* @name POST Intel search
* @description Initialize a search
* @route {POST} /v1/intel/initializeSearch
* @response {200} OK
* @response {500} Internal error
* @responsebody {string} [code] internal_error
* @responsebody {string} [message] error description
*/

router.post('/v1/intel/initializeSearch',
    initialSearchIntel
);

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
* @name POST Intel search
* @description Searches the preview by a sid
* @route {POST} /v1/intel/findPreview
* @response {200} OK
* @response {500} Internal error
* @responsebody {string} [code] internal_error
* @responsebody {string} [message] error description
*/

router.post('/v1/intel/findPreview',
    findAndReturnPreview
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
