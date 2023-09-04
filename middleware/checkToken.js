const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function(req, res, next) {
    // let auth = req.header('Authorization')
    // let token = auth && auth.split(' ')[1]
    let token = req.cookies.token
    try {
        if(token) {
            let decode = jwt.verify(token, process.env.JWT_SERCET)
            req.decode = decode.id
            next()
        } else {
            res.status(401).json('Token not found')
        }
    } catch (error) {
        res.status(401).json(error)
    }     
}