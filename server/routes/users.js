import express from 'express';
import controller from '../controllers/users';

const router = express.Router();

// Add a user
router.post('/auth/signup', controller.add_user);
// Add a user
router.post('/auth/login', controller.login);

export default router;
