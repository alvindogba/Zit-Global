// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../models/index.js";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const User = db.User; 

export async function logInController(req, res) {
  const { email, password, role } = req.body;

  try {
    // 1. Properly filter by email and role
    const user = await User.findOne({
      where: { email, role }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 2. Use the correct hash property
    const hash = user.password_hash;  // or user.passwordHash

    // 3. Compare plaintext password against hash
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4. Sign JWT and respond
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('AuthController.login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Log Out 
export async function logOutController(req, res) {
  try {
    // Invalidate the token (if using a blacklist or similar strategy)
    // For now, just send a success message
    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('AuthController.logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
