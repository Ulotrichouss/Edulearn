const { ObjectId } = require('mongodb')
var mongoose = require('mongoose')

var RateSchema = new mongoose.Schema ({
    classId: { type: ObjectId, ref: 'Class' },
    userId: { type: ObjectId, ref: 'Users' },
    star: { type: Number },
})

module.exports = mongoose.model('Rates',RateSchema)