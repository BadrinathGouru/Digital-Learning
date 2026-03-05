const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProgress, saveUserProgress } = require('../controllers/userController');

// Define specific routes mapping to controller logic
router.post('/', registerUser);
router.post('/login', authUser);
router.get('/progress/:id', getUserProgress);
router.put('/progress/:id', saveUserProgress);

module.exports = router;
