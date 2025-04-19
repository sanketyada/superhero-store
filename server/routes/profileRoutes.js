import express from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../middleware/authMiddleware.js';
import { updateProfile } from '../controllers/profileController.js'; // make sure this exists

const router = express.Router();

// 📸 Setup Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 🔄 Update profile route
router.put('/update', requireAuth, upload.single('avatar'), updateProfile);

// 👤 View profile route
router.get('/', requireAuth, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user, // user object is attached by requireAuth middleware
  });
});

export default router;
