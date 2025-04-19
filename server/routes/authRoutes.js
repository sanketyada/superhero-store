import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 Auth routes
router.post('/signup', signup);
router.post('/login', login);

// 🛡️ Protected test route
router.get('/profile', requireAuth, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user,
  });
});

export default router;
