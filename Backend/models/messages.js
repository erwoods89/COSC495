const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        defaul: Date.now
    },
    user: {
        type: String,
        requried: true
    }
})

exports.Messages = mongoose.model('Messages', messageSchema);