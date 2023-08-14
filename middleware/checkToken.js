const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = function(req, res, next) {
    var auth = req.header('Authorization')
    var token = auth && auth.split(' ')[1]
    
    try {
        var decode = jwt.verify(token, process.env.JWT_SERCET)
        req.decode = decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
    }     
}