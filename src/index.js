const express = require('express');
const bodyParser = require('body-parser');
const {PORT, FLIGHT_SEARCH_REQUEST_URL} = require('./config/server-config');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware')
async function setupAndStartServer(){

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(morgan('combined'));

    const limiter = {
        windowMs: 5 * 60 * 1000,
        max: 5
    }

    app.use(rateLimit(limiter));

    app.use('/searchService', createProxyMiddleware({target: FLIGHT_SEARCH_REQUEST_URL, changeOrigin: true}))
    
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