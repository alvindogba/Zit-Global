import express from 'express';
import { signUp, login, getProfile, updateProfile, getAllReferrals, getReferralsState, forgotPassword, resetPassword, uploadAvatar, getPayouts, requestPayout } from '../Controller/PartnerController.js';
import tokenCheck from '../middleware/tokenCheck.js';
import upload from '../Middlewares/multerConfig.js';


const partnerRouter = express.Router();
// Authentication routes 
partnerRouter.post('/auth/signup', signUp);
partnerRouter.post('/auth/login', login);
partnerRouter.post('/auth/forgot-password', forgotPassword);
partnerRouter.post('/auth/reset-password', resetPassword);

// Profile routes
partnerRouter.post('/profile/avatar', tokenCheck, upload.single('avatar'), uploadAvatar);

// Partner profile routes
partnerRouter.get('/profile/me', tokenCheck, getProfile);
partnerRouter.put('/profile/me', tokenCheck, updateProfile);

// Referral routes
partnerRouter.get('/referrals', tokenCheck, getAllReferrals);
partnerRouter.get("/referrals/stats", tokenCheck, getReferralsState);

// Payout routes
partnerRouter.get('/payouts', tokenCheck, getPayouts);
partnerRouter.post('/payouts/request', tokenCheck, requestPayout);

export default partnerRouter;