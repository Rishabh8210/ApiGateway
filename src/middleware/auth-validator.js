const axios = require('axios')
const {StatusCodes} = require('http-status-codes')
const {AUTH_SERVICE_REQUEST_URL} = require('../config/server-config')
const authValidator = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        console.log(token)
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Access token is missing in the request',
                success: false
            })
        }
        const response = await axios.get(`${AUTH_SERVICE_REQUEST_URL}/api/v1/isAuthenticated`, {
            headers: {
                'x-access-token' : token
            }
        })
        if(response.data.success){
            next();
        } else{
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'You are not authorized to access this resource',
                success: false
            })
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong, please try again later',
            success: false
        })
    }
}


module.exports = authValidator