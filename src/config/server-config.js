const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SEARCH_REQUEST_URL: process.env.FLIGHT_SEARCH_REQUEST_URL,
    BOOKING_SERVICE_REQUEST_URL: process.env.BOOKING_SERVICE_REQUEST_URL,
    AUTH_SERVICE_REQUEST_URL: process.env.AUTH_SERVICE_REQUEST_URL,
    REMAINDER_SERVICE_REQUEST_URL: process.env.REMAINDER_SERVICE_REQUEST_URL
}