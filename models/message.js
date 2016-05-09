'use strict';

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    messageBody: { type: String },
    likes: { type : Number, default: 0},
    author:{type: String }
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
