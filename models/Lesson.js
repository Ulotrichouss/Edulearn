const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const LessonSchema = new mongoose.Schema ({
    classId: { type: ObjectId, ref: 'Class' },
    name: { type: String },
    file: { type: String },
    userId: [{ 
        type: ObjectId, ref: 'Users'
    }]
})

module.exports = mongoose.model('Lesson',LessonSchema)