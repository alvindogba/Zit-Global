import express from 'express';
import multer from 'multer';
import { NewAdmission, getApplicationStatus, updateApplicationStatus } from '../Controller/AdmissionController.js';
import { isAdmin } from '../middleware/authMiddleware.js';
import {createTeacher } from '../Controller/TutorController.js';
import { getStudentsByProgram } from '../Controller/AdmissionController.js';

// Create an Express Router
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Ensure unique filenames
    }
});

// File filter to allow all file types but restrict size to 10MB
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Accept all file types
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB file size limit
    }
});

// Configure multiple file uploads
const uploadFields = upload.fields([
    { name: 'applicantImage', maxCount: 1 },
    { name: 'churchRecommendationLetter', maxCount: 1 },
    { name: 'communityRecommendationLetter', maxCount: 1 }
]);

// Submit new application
router.post('/register', uploadFields, NewAdmission);

// Get application status
router.get('/status/:id', getApplicationStatus);




// Teachers Registration 
router.post('/teachers', createTeacher)

// Admin ================================================================================
// Update application status (admin only)
router.put('/status/:id', isAdmin, updateApplicationStatus);
// Get students by program
router.get('/students',  getStudentsByProgram);

export default router;
