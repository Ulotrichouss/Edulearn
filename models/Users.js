const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    name: { type: String },
    edu: { type: String },
    age: { type: Number },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean },
    token: { type: String },
},{
    timestamps: true
})

module.exports = mongoose.model('Users',UserSchema)