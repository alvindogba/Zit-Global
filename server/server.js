import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import db from './models/index.js';
import router from './Routes/AdmissionRoute.js'
import stripeRouter from './Routes/StripePay.js';
import paypalRouter from './Routes/PaypalRoute.js';
import contactRouter from './Routes/ContactRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the uploads directory exists
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

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use('/uploads', express.static(uploadDir)); // Serve uploaded files

// Custom CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Routes
app.use("/adminssion", router)
app.use('/api/stripe', stripeRouter)
app.use('/api/paypal', paypalRouter)
app.use('/api/contact', contactRouter)
app.get('/test', (req, res) => res.json({ message: 'Server is running!' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy', uptime: process.uptime() }));

// Test database connection
const testDatabaseConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    console.log('Server will continue running without database connection...');
  }
};

// Start server function
const startServer = async () => {
  try {
    // Test database connection but don't wait for it
    testDatabaseConnection();

    // Example route
    app.get('/', (req, res) => {
      res.send('Server is running!');
    });

    // Start the server
    app.listen(PORT,() => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();