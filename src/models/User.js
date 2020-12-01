const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    biography: {
        type: String,
        min: 2,
        max: 255,
        default: 'Who you are?'
    },
    url: {
        type: Boolean,
        default: false
    },
    friends: {
        followers: [{
            name: {type: String},
            id: {type: Number}
        }],
        followed: [{
            name: {type: String},
            id: {type: Number}
        }]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', User);