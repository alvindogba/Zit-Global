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

// the port router 
import portalRouter from './Routes/PortalRoute.js';

const app = express();
const PORT = process.env.PORT ; // Match the port in your image URL

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

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false // Disable Helmet's default CORP policy
}));

// Configure CORS first
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],// Will be "https://zongeatech.com"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Explicitly handle OPTIONS for all routes
app.options('*', cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files with proper headers
app.use('/uploads', express.static(uploadDir, {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Explicitly allow cross-origin
  }
}));

// The Dashboard Routes
app.use("/portal/auth", authRouter) // Auth routes for the dashboard
app.use("/api/portal", portalRouter) 


// Routes
app.use("/api/icc", tutorRoute)
app.use("/admission", router);
app.use('/api/stripe', stripeRouter);
app.use('/api/paypal', paypalRouter);
app.use('/api/contact', contactRouter);
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