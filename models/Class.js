const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const Class = new mongoose.Schema ({
    author: { type: ObjectId,ref: "Users"},
    video: { type: String },
    image: { type: String },
    title: { type: String },
    intro: { type: String },
    about: { type: String },
    keypoint: [{
        type: String
    }],
    benefit: [{
        type: String
    }],
    tool: [{ 
        type: ObjectId, ref: "Tools"
    }],
    mentor: [{ 
        name: String,
        image: String,
        about: String 
    }],
    register: [{ 
        type: ObjectId,
        ref: "Users"
    }],
    price: { type: String },
})

module.exports = mongoose.model('Class',Class);