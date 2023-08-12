const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");

module.exports = {

    login: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email: email})
        .then(data => {
            var pwIsValid = bcrypt.compareSync( password,data.password);
            
            if(!pwIsValid) {
                return res.status(401).json({
                    token: null,
                    msg: 'Invalid Password'
                })
            }
            var token = jwt.sign({ id: data._id}, 
                process.env.JWT_SERCET, {
                expiresIn: '1d'
              });
            res.status(200).json({
                msg:'Login success',
                data,
                token: token
            })
        })
        .catch (err=>{
            res.json({
                msg:'Login error',
                err
            })
        })
    },

    register: (req, res) => {
        const user = new User({
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password),
            edu : req.body.edu,
            age : req.body.age,
            phone : req.body.phone,
        }) 

        User.findOne({email: req.body.email})
        .then(data=>{
            if(data) {  
                res.status(401).json({
                    success: false,
                    msg: 'Email is exist'
                })
            } else {
                user.save()
                .then(data=>{
                    res.status(200).json({
                        success: true,
                        msg: 'Register Success',
                        data
                    })
                })
            }
        })
        .catch(err=>{
            res.status(500).json('Register error')
        })
    },

    profile: (req, res) => {
        var id = req.decode.id
        User.findOne({ _id: id })
        .then(data=>{
            res.json({
                success: true,
                user: data,
            })
        })
    }
}