// Mentorship Router Code:
import express from 'express';
import { mentorController } from '../Controller/MentoringController.js';

const mentoringRouter = express.Router();

// Create routes for Tutorring Program
mentoringRouter.post("/create", mentorController)



export default mentoringRouter;
// In the code snippet above, we have created the mentorshipRouter, which is an instance of the express.Router class. We have defined the following routes for mentorship-related operations:

