const rateLimit = require('express-rate-limit');
const RATE_LIMITER_MAX_QUANT = parseInt(process.env.RATE_LIMITER_MAX_QUANT);
const RATE_LIMITER_WINDOW_MS = parseInt(process.env.RATE_LIMITER_WINDOW_MS);

const limiter = rateLimit({
    max: RATE_LIMITER_MAX_QUANT,
    windowMs: RATE_LIMITER_WINDOW_MS,
    message: 'Too many requests'
});

module.exports = {limiter};
