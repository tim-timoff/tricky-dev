import { logger } from './logger';
import { MongoClient } from 'mongodb';
import { mongoUrl, dbNameAdmin, dbNameTricky } from './mConstants';

logger.info(`mongoUrl: ${mongoUrl}`);
logger.info(`dbNameAdmin: ${dbNameAdmin}`);
logger.info(`dbNameTricky: ${dbNameTricky}`);

export const admClient = new MongoClient(mongoUrl + dbNameAdmin);
export const trickyClient = new MongoClient(mongoUrl + dbNameTricky);

// Add an event listener for the 'poolCreated' event
admClient.on('poolCreated', (event) => {
    logger.info('Connection pool created for admin client: ', event);
});

// Add an event listener for the 'poolCreated' event
trickyClient.on('poolCreated', (event) => {
    logger.info('Connection pool created for tricky client: ', event);
});
  
// Connect to MongoDB
admClient.connect()
.then(() => {
    // Your logic after successful connection
    logger.info('Connected to admin database...');
})
.catch((err) => {
    logger.error(`Error connecting to admin database: ${(err as Error).message}`);
});

// Connect to MongoDB
trickyClient.connect()
.then(() => {
    // Your logic after successful connection
    logger.info('Connected to tricky database...');
})
.catch((err) => {
    logger.error(`Error connecting to tricky database: ${(err as Error).message}`);
});