import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// The sign up Controller 
export const signUp = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const { email, password, fullName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const affiliateCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // check for existing user
    const existingUser = await db.Profile.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await db.Profile.create({
      email,
      password_hash: hashedPassword,
      full_name: fullName,
      affiliate_code: affiliateCode,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName } });    
    } catch (error) {   
    res.status(500).json({ error: error.message });
    console.error('Error during signup:', error);
    }
    }
// The login Controller
export const login = async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;

    // Find user by email
    const user = await db.Profile.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user.id, email: user.email, fullName: user.full_name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// The get profile Controller
export const getProfile = async (req, res) => {
  try {
    console.log('Received get profile request:', req.user);
    const userId = req.user.id;

    // Find user by ID
    const user = await db.Profile.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const affiliateCode = user.affiliate_code;
    const referralLink = `${process.env.ZONGEA_TECH_DONATION_SITE}/donate?ref=${affiliateCode}`;

    res.status(200).json({ user: { id: user.id, email: user.email, fullName: user.full_name, affiliateCode, referralLink } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// The update profile Controller
export const updateProfile = async (req, res) => {
  try {
    console.log('Received update profile request:', req.body);
    const userId = req.user.id;
    const { fullName, avatarUrl } = req.body;

    // Update user profile
    const updatedUser = await db.Profile.update(
      { full_name: fullName, avatar_url: avatarUrl },
      { where: { id: userId }, returning: true }
    );

    if (!updatedUser[0]) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: updatedUser[1][0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// The get all Referral Controller
export const getAllReferrals = async (req, res) => {
  try {
    console.log('Received get all referrals request:', req.user);
    const userId = req.user.id;

    // Find all referrals for the user
    const referrals = await db.Referral.findAll({ where: { affiliate_id: userId } });

    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// The get Referral state Controller
export const getReferralsState = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const state = await db.Referral.findAll({
      where: { affiliate_id: req.user.id },
      attributes: ['id', 'amount', 'commission', 'created_at'],
   
    });

    res.status(200).json(state);
  } catch (error) {
    console.error('Error fetching referral state:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

