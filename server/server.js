import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import db from './models/index.js';
import router from './Routes/AdmissionRoute.js';
import stripeRouter from './Routes/StripePay.js';
import paypalRouter from './Routes/PaypalRoute.js';
import contactRouter from './Routes/ContactRoute.js';
import tutorRoute from './Routes/TutorShipRoute.js';
import authRouter from './Routes/portalAuthRouter.js';
import portalRouter from './Routes/PortalRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Log configured origins for CORS sanity check
console.log('CORS allowed origins:', process.env.FRONTEND_URL, process.env.DASHBOARD_URL);

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// CORS configuration
const corsOptions = {
  origin: [ process.env.FRONTEND_URL, process.env.DASHBOARD_URL ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Enable CORS using configured options
app.use(cors(corsOptions));
// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Request parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static uploads with cross-origin policy
app.use('/uploads', express.static(uploadDir, {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// Dashboard authentication and portal routes
app.use('/portal/auth', authRouter);
app.use('/api/portal', portalRouter);

// API routes
app.use('/api/icc', tutorRoute);
app.use('/admission', router);
app.use('/api/stripe', stripeRouter);
app.use('/api/paypal', paypalRouter);
app.use('/api/contact', contactRouter);
app.get('/test', (_req, res) => res.json({ message: 'Server is running!' }));
app.get('/health', (_req, res) => res.status(200).json({ status: 'healthy', uptime: process.uptime() }));

// Test database connection
const testDatabaseConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

// Start server
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    testDatabaseConnection();
  });
};

startServer();
