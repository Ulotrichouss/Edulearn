var mongoose = require('mongoose')

var ToolSchema = new mongoose.Schema ({
    name: { type: String },
    image: { type: String }
})

module.exports = mongoose.model('Tools',ToolSchema)