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
// … above is unchanged …

const loadModels = async () => {
  const files = fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.endsWith('.js') &&
        !file.endsWith('.test.js')
    );

  for (const file of files) {
    try {
      const modelModule = await import(`file://${path.join(__dirname, file)}`);
      if (modelModule.default) {
        const model = modelModule.default(sequelize, DataTypes); // no await here
        if (model && model.name) {
          db[model.name] = model;
          console.log(`→ Loaded model: ${model.name}`);    // ← log it
        }
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  }
};

const initializeDatabase = async () => {
  try {
    await loadModels();
    console.log('💡 Models in db:', Object.keys(db));
    establishAssociations();
    console.log('✅ Models loaded and associated successfully.');
  } catch (error) {
    console.error('Error loading models:', error);
    throw error;
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



db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize database
await initializeDatabase();

export default db;