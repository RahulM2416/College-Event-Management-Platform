const Event = require("../models/Event");

exports.createEvent = async (req,res)=>{
    try{
        const event = await Event.create({...req.body, createdBy: req.user.id});
        res.json({event});
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getEvents = async (req,res) => {
    try {
        const events = await Event.find().populate('createdby','name email');
        res.json(events);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};