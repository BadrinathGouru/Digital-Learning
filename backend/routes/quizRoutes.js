const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, createQuiz, submitQuiz } = require('../controllers/quizController');

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/', createQuiz);
router.post('/:id/submit', submitQuiz);

module.exports = router;
