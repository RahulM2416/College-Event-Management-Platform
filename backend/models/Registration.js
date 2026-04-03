const mongoose = require('mongoose');
const User = require('./User');
const Event = require('./Event');

const registrationSchema = new mongoose.Schema({
    user : {type:mongoose.Schema.ObjectId, ref:User},
    event : {type:mongoose.Schema.ObjectId, ref: Event},
    registeredAt : {type: Date, default : Date.now}
}
);

module.exports = mongoose.model('Registration', registrationSchema);
