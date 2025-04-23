// Mentorship Router Code:
import express from 'express';
import { createSchoolAdmin, createTutor, createParent, createTutees, createTeacher } from '../Controller/TutorController.js';

const tutorRoute = express.Router();

// Create routes for Tutorring Program
tutorRoute.post("/tutor", createTutor)
tutorRoute.post('/tutees', createTutees);
tutorRoute.post("/parents", createParent);
tutorRoute.post("/schoolAdmins", createSchoolAdmin)
tutorRoute.post("/teachers", createTeacher)


export default tutorRoute;
// In the code snippet above, we have created the mentorshipRouter, which is an instance of the express.Router class. We have defined the following routes for mentorship-related operations:

