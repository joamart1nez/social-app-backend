const mongoose = require('mongoose');

const Task = mongoose.Schema({
    user: {type: String},
    title: {type: String},
    description: {type: String},
    priority: {type: String},
    status: {type: Boolean},
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', Task);