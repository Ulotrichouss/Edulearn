const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema ({
    name: { type: String },
    edu: { type: String },
    age: { type: Number },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    image: { type: String },
    about: { type: String },
    role: { type: Number },
    token: { type: String },
},{
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = mongoose.model('Users',UserSchema)