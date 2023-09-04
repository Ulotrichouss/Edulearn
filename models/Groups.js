const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema ({
    name: { type: String},
    image: { type: String},
    include: [{
        classId: {type: ObjectId, ref: 'Class'},
        level: String
    }],
})

module.exports = mongoose.model('Groups',GroupSchema)