import express from 'express';
import controller from '../controllers/users';

const router = express.Router();

// Add a user
router.post('/', controller.add_user);

export default router;
