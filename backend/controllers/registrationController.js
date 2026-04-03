const Registration = require('../models/Registration');
const Event = require('../models/Event');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

exports.registerForEvent = async (req,res) => {
    try{
        const {eventId} = req.body;

        const event = await Event.findById(eventId);
        if(!event) return res.status(404).json({message: "Event not found"});

        const existing = await Registration.findOne({
            user : req.user.id,
            event : eventId,
        });
        if(existing) {
            res.status(400).json({message : "Already registered"});
        }

        const registration = await Registration.create({
            user : req.user.id,
            event : eventId
        });

        // qr code generation
        const qrData = JSON.stringify({
            userId : req.user.id,
            eventId : event._id,
            registrationId : registration._id,
            Event : event.title
        });

        const qrImage = await QRCode.toBuffer(qrData);

        // ticket generation
        const doc = new PDFDocument();

        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${Date.now}"`);
        
        doc.pipe(res);
        doc.font("Courier");
        const now = new Date().toLocaleString();
        doc.fontSize(12).text(now,{align : "right"});
        doc.moveDown(2);

        doc.fontSize(20).text('College Event Ticket',{align: 'center'});
        doc.moveDown();
        doc.dash(5,{space : 5}).moveTo(50,doc.y).lineTo(550,doc.y).stroke();
        doc.undash();
        doc.moveDown(2);

        doc.fontSize(15).text(`Event : ${event.title}`);
        doc.text(`Date : ${event.date}`);
        doc.text(`Location : ${event.location}`);
        doc.moveDown();

        doc.text(`User ID : ${req.user.id}`);
        doc.text(`Registration ID : ${registration._id}`);
        doc.moveDown(3);
        doc.image(qrImage, {
            fit : [150,150],
            align:'center'
        });
        doc.moveDown(2);
        doc.fontSize(14).text('Thank You For Registering.. & Enjoy the Event' ,{align :'center'});
        
        doc.end();

    } catch(err){
        res.status(500).json({error:err.message});
    }
};
