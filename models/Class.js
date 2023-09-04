const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const Class = new mongoose.Schema ({
    author: { type: ObjectId,ref: "Users"},
    video: { type: String },
    image: { type: String },
    title: { type: String },
    intro: { type: String },
    about: { type: String },
    keypoint: [ String ],
    benefit: [ String ],
    tool: [{
        type: ObjectId, ref: "Tools"
    }],
    register: [{ 
        type: ObjectId, ref: "Users"
    }],
    rating: [{
        userId: { type: ObjectId, ref: "Users"},
        star: Number
    }],
    price: { type: String },
    totalRating: { type: Number, default: 0}
})

module.exports = mongoose.model('Class',Class);