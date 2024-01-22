import logger from './logger';
import { dbUser, dbPass, dbNameTricky } from './mConstants';
import { initAdmClient, initTrickyClient, iAUrl, iTUrl } from './dbOps';
import mAdminUserModel from './mAdminUserModel';

async function checkAndCreateAdmin(): Promise<void> {
  const adminData = { 
    name: dbUser, 
    pass: dbPass,
    // Add roles based on conditions, using a regular expression to match the name
    roles: (adminName: string) => (/(m.*t.*c*)/.test(adminName) ? ['dbAdmin', 'readWrite'] : ['readWriteAnyDatabase', 'userAdmin'])
  };

  try {
    // Check if the admin already exists
    const existingAdmin = await mAdminUserModel.findOne({ name: adminData.name }).lean();
    
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
  logger.info(`Admin check or create complete.`);
}

async function findOrCreateTrickyDB(): Promise<void> {
  try {
    // Check if the "tricky" database exists
    const client = initTrickyClient;
    const databasesList = await client.db().admin().listDatabases();
    const trickyDatabaseExists = databasesList.databases.some((db: any) => db.name === dbNameTricky);

    if (!trickyDatabaseExists) {
      logger.info('Creating "tricky" database...');
      try {
        await client.db(dbNameTricky).createCollection('dummy'); // Create a dummy collection
      } catch (err) {
        logger.error(`Error creating "dummy" collection: ${(err as Error).message}`);
      }
    } else {
      logger.info('"tricky" database already exists.');
    }
  } catch (error) {
    logger.error(`Error checking or creating "tricky" database: ${(error as Error).message}`);
    throw error; // Rethrow the error for Promise.all
  }
}

// Connect to admin and tricky databases
Promise.all([initAdmClient.connect(), initTrickyClient.connect()])
  .then(() => {
    logger.info('Both clients connected to MongoDB');
    // Call the separate functions for admin and tricky
    return Promise.all([checkAndCreateAdmin(), findOrCreateTrickyDB()]);
  })
  .then(() => {
    logger.info('Initialization complete.');
    // Close the MongoDB connections
    return Promise.all([initAdmClient.close(), initTrickyClient.close()]);
  })
  .catch((error) => {
    logger.error(`Initialization failed: ${(error as Error).message}`);
    // Close the MongoDB connections in case of an error
    return Promise.all([initAdmClient.close(), initTrickyClient.close()]);
  });

// Add an event listener for the 'poolCreated' event
initAdmClient.on('poolCreated', (event) => {
  logger.info(`Connection pool created for admin client, using url: ${iAUrl} `, event);
});

// Add an event listener for the 'poolCreated' event
initTrickyClient.on('poolCreated', (event) => {
  logger.info(`Connection pool created for tricky client, using url: ${iTUrl}`, event);
});

initAdmClient.on('closed', (event) => {
  logger.info(`Connection closed and initial admin client instance destroyed`, event);
});

initTrickyClient.on('closed', (event) => {
  logger.info(`Connection closed and initial tricky client instance destroyed`, event);
});

initAdmClient.on('poolClosed', (event) => {
  console.log('Connection pool to admin db closed:', event);
});

initTrickyClient.on('poolClosed', (event) => {
  console.log('Connection pool to tricky db closed:', event);
});
