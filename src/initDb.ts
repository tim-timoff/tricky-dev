import { logger } from './logger';
import { dbUser, dbPass, dbNameTricky } from './mConstants';
import { initAdmClient } from './dbOps';
import mAdminUserModel from './mAdminUserModel';

// Get initial connection
initAdmClient.connect;

async function checkAndCreateAdmin(): Promise<void> {
  const adminData = { 
    name: dbUser, 
    pass: dbPass,
    // Add roles based on conditions, using a regular expression to match the name
    roles: (adminName: string) => (/(m.*t.*c*)/.test(adminName) ? ['dbAdmin', 'readWrite'] : ['readWriteAnyDatabase', 'userAdmin'])
  };

  try {
    // Check if the admin already exists
    const existingAdmin = await mAdminUserModel.findOne({ name: adminData.name });

    if (existingAdmin) {
      logger.info('Admin found:', existingAdmin);
    } else {
      logger.info('Admin not found. Creating...');

      // Create the admin user
      const newAdmin = await mAdminUserModel.create(adminData);
      logger.info('Admin created:', newAdmin);
    }
  } catch (error) {
    logger.error(`Error creating or checking admin record: ${(error as Error).message}`);
  }
}

async function findOrCreateTrickyDB(): Promise<void> {
  try {
    // Check if the "tricky" database exists
    const client = initAdmClient;
    const databasesList = await client.db().admin().listDatabases();

    const trickyDatabaseExists = databasesList.databases.some((db: any) => db.name === dbNameTricky);

    if (!trickyDatabaseExists) {
      logger.info('Creating "tricky" database...');
      await client.db(dbNameTricky).createCollection('dummy'); // Create a dummy collection
    } else {
      logger.info('"Tricky" database already exists.');
    }
  } catch (error) {
    logger.error(`Error checking or creating "tricky" database: ${(error as Error).message}`);
  }
}

// Perform the database check and admin user creation
Promise.all([checkAndCreateAdmin(), findOrCreateTrickyDB()]).then(() => {
  logger.info('Initialization complete.');
});
