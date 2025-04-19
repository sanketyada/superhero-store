import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const updates = {
      username,
      email,
    };

    if (req.file) {
      updates.avatar = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    }).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
