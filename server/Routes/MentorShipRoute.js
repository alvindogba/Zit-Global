// Mentorship Router Code:
import express from 'express';
import createMentorship  from '../Controller/MentorshipController.js';

const mentorshipRouter = express.Router();

// Create mentorship
mentorshipRouter.post('/create', createMentorship);

export default mentorshipRouter;
// In the code snippet above, we have created the mentorshipRouter, which is an instance of the express.Router class. We have defined the following routes for mentorship-related operations:

