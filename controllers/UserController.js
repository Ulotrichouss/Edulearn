const User = require('../models/Users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")

module.exports = {

    login: (req, res) => {
        const {email, password} = req.body

        User.findOne({email})
        .then(data => {
            if(data) {
                let pwIsValid = bcrypt.compareSync( password,data.password)

                if(!pwIsValid) {
                    return res.status(401).json({
                        msg: 'Invalid Password'
                    })
                }
                let token = jwt.sign({id: data._id}, 
                    process.env.JWT_SERCET, {
                    expiresIn: '1h'
                })

                res.cookie('token',token, {
                    httpOnly: true,
                })
                res.status(200).json({
                    token: token
                    
                })  
            } else {
                res.status(401).json({
                    msg:'User not found',
                }) 
            }
        })
        .catch (err=>{
            res.status(401).json({
                msg:'Login error',
                err
            })
        })
    },

    register: (req, res) => {
        const user = new User({
            email : req.body.email,
            password : req.body.password,
            edu : req.body.edu,
            age : req.body.age,
            phone : req.body.phone,
            token: null
        }) 

        User.findOne({email: user.email})
        .then(data=>{
            if(data) {  
                res.status(401).json({
                    msg: 'Email is exist'
                })
            } else {
                user.save()
                .then(data=>{
                    res.status(200).json({
                        msg: 'Register Success',
                        data
                    })
                })
            }
        })
        .catch(err=>{
            res.status(401).json({
                msg: 'Register error',
                err
            })
        })
    },

    logout: (req, res) => {
        res.clearCookie('token')
        res.status(200).json({
            msg:'Logout Success'
        })
    },

    profile: (req, res) => {
        let id = req.decode
        User.findOne({_id: id})
        .then(data=>{
            res.json(data)
        })
    },

    putProfile: (req, res) => {
        let id = req.decode
        const { email,edu,age,phone } = req.body 
        var data = {email,edu,age,phone}
        
        User.findByIdAndUpdate(id,data)
        .then(data=>{
            res.status(200).json({
                msg: 'Update Success',
            })
        }).catch(err=>{
            res.status(401).json({
                msg: 'Update Error',
            })
        })
    },

    putUser: (req, res) => {
        let id = req.params.userId
        const { email,edu,age,phone } = req.body 
        var data = {email,edu,age,phone}
        
        User.findByIdAndUpdate(id,data)
        .then(data=>{
            res.status(200).json({
                msg: 'Update Success',
            })
        }).catch(err=>{
            res.status(401).json({
                msg: 'Update Error',
            })
        })
    },

    deleteUser: (req, res) => {
        let id = req.params.userId
        User.findByIdAndDelete(id)
        .then(data=>{
            res.status(200).json({
                msg: 'Delete Success'
            })
        }).catch(err=>{
            res.status(401).json({
                msg: 'Delete Error',
                err
            })
        })
    },

    changePwd: (req, res) => {
        let id = req.decode
        let password = req.body.password

        User.findByIdAndUpdate(id,password)
        .then(data=>{
            res.status(200).json({
                msg: 'Change Password Success',
            })
        }).catch(err=>{
            res.status(401).json({
                msg: 'Change Password Error',
                err
            })
        })
    }
    
}