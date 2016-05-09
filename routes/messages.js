var express = require('express');
var router = express.Router();

var Message = require('../models/message');
// var Property = require('../models/property');


//GET /api/messages  ----> return array of all messages
//POST /api/messages ----> create a new message

router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(messages);
        }
    });
});
router.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, message) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(message);
        }
    });
});


router.delete('/:id', (req, res) => {

    Message.findByIdAndRemove(req.params.id, (err, message) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send();
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    var message = new Message(req.body);
    message.save((err, savedMessage) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(savedMessage)
        }
    });
});

router.put('/:id', (req, res) => {
    console.log('routing', req.body);
    var newlikes = req.body.likes + 1;
    console.log((newlikes));
    Message.findByIdAndUpdate(req.params.id, { $set: { likes: newlikes }}, (err, message) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(message);
        }
    })
})
router.put('/decrease/:id', (req, res) => {
    console.log('routing', req.body);
    var newlikes = Number(req.body.likes) - 1;
    console.log(newlikes);
    Message.findByIdAndUpdate(req.params.id, { $set: { likes: newlikes }}, (err, message) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(message);
        }
    })
})
module.exports = router;
