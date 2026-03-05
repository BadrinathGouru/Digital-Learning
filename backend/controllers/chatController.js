const Message = require('../models/Message');

// @desc    Get chat history for a room
const getChatHistory = async (req, res) => {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
        return res.json([
            { _id: 'm1', roomId: req.params.roomId, senderName: 'Mr. Sharma', senderRole: 'teacher', text: 'Good morning class! Today we will review Chapter 4.', type: 'text', timestamp: new Date() },
            { _id: 'm2', roomId: req.params.roomId, senderName: 'Aarav', senderRole: 'student', text: 'Good morning sir! Ready to learn.', type: 'text', timestamp: new Date() },
        ]);
    }
    try {
        const messages = await Message.find({ roomId: req.params.roomId })
            .sort({ timestamp: -1 })
            .limit(50);
        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Send a message (REST fallback for offline)
const sendMessage = async (req, res) => {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
        return res.status(201).json({ _id: `msg-${Date.now()}`, ...req.body, timestamp: new Date() });
    }
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ message: 'Failed to send message', error: error.message });
    }
};

module.exports = { getChatHistory, sendMessage };
