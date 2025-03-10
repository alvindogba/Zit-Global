import express from 'express';
import { submitContactForm, getContacts, updateContactStatus } from '../Controller/ContactController.js';

const contactRouter = express.Router();

// Submit contact form
contactRouter.post('/submit', submitContactForm);

// Get all contacts (admin route)
contactRouter.get('/', getContacts);

// Update contact status (admin route)
contactRouter.patch('/:id/status', updateContactStatus);

export default contactRouter;
