import express from 'express';
import controller from '../controllers/meetups';

const router = express.Router();

// Get Meetups
router.get('/', controller.get_meetups);
// Get Upcoming Meetup
router.get('/', controller.get_upcoming_meetups);
// Get Upcoming Meetup
router.get('/:id', controller.get_specific_meetups);
// Post Meetup
router.post('/', controller.post_meetups);
// Post Rsvp
router.post('/:id/rsvps', controller.post_rsvp);

export default router;
