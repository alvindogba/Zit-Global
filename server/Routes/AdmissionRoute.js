import express from 'express';
import multer from 'multer';
import { NewAdmission, getApplicationStatus, updateApplicationStatus } from '../Controller/AdmissionController.js';
import { isAdmin } from '../middleware/authMiddleware.js';

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

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Allow only images and PDFs
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only images and PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
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
router.get('/status/:applicationNumber', getApplicationStatus);

// Update application status (admin only)
router.put('/status/:applicationNumber', isAdmin, updateApplicationStatus);

export default router;
