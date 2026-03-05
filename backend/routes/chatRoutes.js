const express = require('express');
const router = express.Router();
const { getChatHistory, sendMessage } = require('../controllers/chatController');

router.get('/:roomId', getChatHistory);
router.post('/', sendMessage);

module.exports = router;
