import express from 'express';
import controller from '../controllers/meetups';
import Auth from '../middleware/Auth';

const router = express.Router();

// Get Meetups
router.get('/', controller.get_meetups);
// Get Upcoming Meetup
router.get('/upcoming', controller.get_upcoming_meetups);
// Get Upcoming Meetup
router.get('/:id', controller.get_specific_meetups);
// Post Meetup
router.post('/', Auth.verifyToken, controller.post_meetups);
// Post Rsvp
router.post('/:id/rsvps', controller.post_rsvp);
// Post question on specific meetup
router.post('/:id/questions', controller.post_question);

export default router;
