import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ==============================
// 🔐 Login Controller
// ==============================
export const login = async (req, res) => {
  const { email, password } = req.body;
  const emailLower = email?.toLowerCase();
  console.log("Login request body:", req.body);

  try {
    const user = await User.findOne({ email: emailLower });

    if (!user) {
      console.log(" User not found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("👉 Entered password:", password);
    console.log("🔐 Stored hash in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || 'supersecretkey', 
      { expiresIn: '1h' } 
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🔥 Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 📝 Signup Controller
// ==============================
export const signup = async (req, res) => {
  const { username, email, password } = req.body || {};
  const emailLower = email?.toLowerCase();
  console.log("Signup request body:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      console.log(" User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(" Hashed password to be saved:", hashedPassword);

    const newUser = new User({
      username,
      email: emailLower,
      password
    });

    await newUser.save();

    // ✅ Generate JWT Token after signup
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error(" Signup error:", err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
