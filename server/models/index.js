import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import process from "process";
import config from "../config/config.js";  

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const db = {};

// Initialize Sequelize instance
let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// Dynamically import models
const loadModels = async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js") &&
      !file.endsWith(".test.js")
    );
  });

  for (const file of files) {
    try {
      const modelModule = await import(`file://${path.join(__dirname, file)}`);
      if (modelModule.default) {
        const model = await modelModule.default(sequelize, DataTypes);
        if (model.name) {
          db[model.name] = model;
        }
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  }
};

// Establish associations
const establishAssociations = () => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

// Initialize models and associations
const initializeDatabase = async () => {
  try {
    await loadModels();
    establishAssociations();
    console.log("Models loaded successfully.");
  } catch (error) {
    console.error("Error loading models:", error);
    throw error;
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize database
await initializeDatabase();

export default db;