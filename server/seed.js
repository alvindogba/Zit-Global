// seed.js
import db from './models/index.js';          // your Sequelize setup (ESM)
import adminSeeder from './seeders/20250427152310-Admin.mjs';  // your ESM seeder

async function run() {
  try {
    // Make sure DB connection is ready
    await db.sequelize.authenticate();

    // Run the 'up' of your seeder
    await adminSeeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
    console.log('✅ Seed completed successfully');

    await db.sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    await db.sequelize.close();
    process.exit(1);
  }
}

run();
