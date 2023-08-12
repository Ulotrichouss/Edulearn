const { ObjectId } = require('mongodb')
var mongoose = require('mongoose')

var LessonSchema = new mongoose.Schema ({
    classId: { type: ObjectId, ref: 'Class' },
    name: { type: String },
    file: { type: String },
    userId: [{ 
        type: ObjectId, ref: 'Users'
    }]
})

module.exports = mongoose.model('Lesson',LessonSchema)