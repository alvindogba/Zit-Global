import express from 'express';
import { signUp, login, getProfile, updateProfile, getAllReferrals, getReferralsState} from '../Controller/PartnerController.js';
import tokenCheck from '../middleware/tokenCheck.js';


const partnerRouter = express.Router();
// Authentication routes 
partnerRouter.post('/auth/signup', signUp);
partnerRouter.post('/auth/login', login);

// Partner profile routes
partnerRouter.get('/profiles/me', tokenCheck, getProfile);
partnerRouter.put('/profiles/me', tokenCheck, updateProfile);

// Referral routes
partnerRouter.get('/referrals', tokenCheck, getAllReferrals);
partnerRouter.get("/referrals/stats", tokenCheck, getReferralsState);



export default partnerRouter;