let mongoose = require('mongoose')

let messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

let Message = module.exports = mongoose.model('message', messageSchema);

module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}