// Mentorship Router Code:
import express from 'express';
import { createSchoolAdmin, createMentor, createParent, createStudent } from '../Controller/MentorshipController.js';

const mentorshipRouter = express.Router();

// Create mentorship
mentorshipRouter.post('/students', createStudent);
mentorshipRouter.post("/parents", createParent);
mentorshipRouter.post("/schoolAdmins", createSchoolAdmin)
mentorshipRouter.post("/mentors", createMentor)


export default mentorshipRouter;
// In the code snippet above, we have created the mentorshipRouter, which is an instance of the express.Router class. We have defined the following routes for mentorship-related operations:

