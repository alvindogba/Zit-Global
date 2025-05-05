import express from 'express';
import MenteeController from '../Controller/MenteeController.js';

const menteeRouter = express.Router();

// Routes for mentee management
menteeRouter.post('/create', MenteeController.createMentee);
menteeRouter.get('/', MenteeController.getAllMentees);
menteeRouter.get('/:id', MenteeController.getMenteeById);
menteeRouter.put('/:id', MenteeController.updateMentee);
menteeRouter.delete('/:id', MenteeController.deleteMentee);

export default menteeRouter;