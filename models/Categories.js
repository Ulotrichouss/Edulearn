var mongoose = require('mongoose')

var CateSchema = new mongoose.Schema ({
    name: { type: String },
    image: { type: String }
})

module.exports = mongoose.model('Categories',CateSchema)