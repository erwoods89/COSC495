const { Messages } = require('../models/messages');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const messageList = await Messages.find();

    if (!messageList) {
        res.status(500).json({sucess: false})
    }
    res.send(messageList);
})

router.post(`/`, async (req, res) => {
    let message = new Messages({
        name: req.body.name,
        message: req.body.message,
    })
    
    message = await message.save();

    if (!message)
        return res.status(404).send('The user cannot be created');
    
    res.send(message)
})

router.get('/:name', async (req, res) => {
    const message = await Messages.find({ name: req.params.name});

    if (!message) {
        res.status(500).json({success: false});
    }
    res.send(message);
})

module.exports = router;