const mongoose = require('mongoose');
const User = require('./User');

const eventSchema = new mongoose.Schema({
    title: String,
    description:String,
    date: Date,
    location : String,
    createdBy : {type: mongoose.Schema.ObjectId, ref: 'User'}
}, {timestamps : true});

module.exports = mongoose.model('Event',eventSchema);
