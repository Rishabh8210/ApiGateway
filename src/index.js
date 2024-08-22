const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware')

const {PORT, FLIGHT_SEARCH_REQUEST_URL, AUTH_SERVICE_REQUEST_URL, BOOKING_SERVICE_REQUEST_URL, REMAINDER_SERVICE_REQUEST_URL} = require('./config/server-config');
const { limiter } = require('./config/rateLimiter-config');

async function setupAndStartServer(){

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(morgan('combined'));

    // Limit each IP to 5 requests per window (here, per 5 minutes).
    app.use(rateLimit(limiter));

    app.use('/searchService', createProxyMiddleware({target: FLIGHT_SEARCH_REQUEST_URL, changeOrigin: true}));
    app.use('/bookingService', createProxyMiddleware({target: BOOKING_SERVICE_REQUEST_URL, changeOrigin: true}));
    app.use('/remainderService', createProxyMiddleware({target: REMAINDER_SERVICE_REQUEST_URL, changeOrigin: true}));
    
    app.get('/hello', (req, res) => {
        return res.status(200).json({
            message: "Hello user"
        })
    })

    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

setupAndStartServer();