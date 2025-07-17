const express = require('express');
const router = express.Router();
const {togglePinQuestion, updateQuestionNote, addQuestionsToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');



router.post('/add', protect, addQuestionsToSession);
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/add', protect, updateQuestionNote);

module.exports = router;