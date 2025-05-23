import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import db from './models/index.js';
import router from './Routes/AdmissionRoute.js';
import stripeRouter from './Routes/StripePay.js';
import paypalRouter from './Routes/PaypalRoute.js';
import contactRouter from './Routes/ContactRoute.js';
import tutorRoute from './Routes/TutorShipRoute.js';
import authRouter from './Routes/portalAuthRouter.js'; // the auth router
import mentoringRouter from "./Routes/mentorRoute.js"
import partnerRouter from "./Routes/Partner.js"
import menteeRouter from "./Routes/menteeRoute.js"


const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Parse allowed origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or if origin is in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));  // Ensure all OPTIONS requests are handled properly

app.use(helmet({
  crossOriginResourcePolicy: false // Disable Helmet's default CORP policy
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files with proper headers
app.use('/uploads', express.static(uploadDir, {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Explicitly allow cross-origin
  }
}));

// The Dashboard Routes
app.use("/portal/auth", authRouter); // Auth routes for the dashboard
// The partnering auth router
// Routes
app.use('/api/partner', partnerRouter);


// Routes
app.use('/api/mentor', mentoringRouter);
app.use('/api/mentee', menteeRouter);
app.use("/api/icc", tutorRoute);
app.use("/admission", router);
app.use('/api/stripe', stripeRouter);
app.use('/api/paypal', paypalRouter);
app.use('/api/contact', contactRouter);

app.get('/', (req, res) =>{
res.send('Welcome to the ICC API!');
})
app.get('/test', (req, res) => res.json({ message: 'Server is running!' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', uptime: process.uptime() }));

// Database connection test
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
