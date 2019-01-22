import express from 'express';
import controller from '../controllers/questions';

const router = express.Router();

// Wecome Message
router.get('/', controller.welcome_message);
// Downvote Question
router.patch('/:id/downvote', controller.downvote_question);
// Upvote Question
router.patch('/:id/upvote', controller.upvote_question);

export default router;
