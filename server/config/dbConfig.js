// File: sequelizeConfig.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || 3306,
      
        pool: {
            max: 10,
            min: 0,
            acquire: 120000, // Increased to 120 seconds
            idle: 20000,    // Increased to 20 seconds
            evict: 60000    // Run cleanup every 60 seconds
        },
        retry: {
            max: 10,        // Increased retry attempts
            timeout: 10000  // Increased timeout between retries
        },
        logging: false
    },
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || 3306,
        dialectOptions: {
            connectTimeout: 60000, // Increased to 60 seconds
            ssl: {
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 120000, // Increased to 120 seconds
            idle: 20000,    // Increased to 20 seconds
            evict: 60000    // Run cleanup every 60 seconds
        },
        retry: {
            max: 10,        // Increased retry attempts
            timeout: 10000  // Increased timeout between retries
        },
        logging: false
    }
};

// Create Sequelize instance with a connection pool
const sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
        ...config[env],
        pool: {
            ...config[env].pool,
            handleDisconnects: true // Automatically handle connection timeouts
        }
    }
);

// Retry logic for database connection
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await sequelize.authenticate();
            console.log('Database connection has been established successfully.');
            return;
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt < retries) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('Max retries reached. Unable to connect to the database.');
                process.exit(1); // Exit if connection is critical
            }
        }
    }
};

// Execute the retry logic
connectWithRetry();

export default sequelize;