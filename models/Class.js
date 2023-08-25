const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Class = new mongoose.Schema ({
    author: { type: Schema.Types.ObjectId,ref: "Users"},
    video: { type: String },
    image: { type: String },
    title: { type: String },
    intro: { type: String },
    about: { type: String },
    keypoint: [ String ],
    benefit: [ String ],
    tool: [{
        type: Schema.Types.ObjectId, ref: "Tools"
    }],
    mentor: [{ 
        name: String,
        image: String,
        about: String 
    }],
    register: [{ 
        type: Schema.Types.ObjectId, ref: "Users"
    }],
    price: { type: String },
})

module.exports = mongoose.model('Class',Class);