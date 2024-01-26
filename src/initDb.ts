require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import logger from './logger';
import mAdminUserModel from './models/mAdminUserModel';
import { MongoClient, Db, Collection } from 'mongodb';
import { AdminCounter } from './counters';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const mongoUser = process.env.DB_USER;
const mongoPass = process.env.DB_PASS;
const mongoUserRoles = process.env.MONGO_ROLES;
const trickyUser = process.env.TR_USER;
const trickyPass = process.env.TR_PASS;
const trickyUserRoles = process.env.TRICKY_ROLES;
const dbNameAdmin = process.env.DB_NAME_ADMIN;
const dbNameTricky = process.env.DB_NAME_TRICKY;
const poolSize = `?minPoolSize=1&maxPoolSize=10`;

const mongoUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/`;
const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;

const iAUrl = initMongoUrl + dbNameAdmin + poolSize;
const iTUrl = initMongoUrl + dbNameTricky + poolSize;

logger.info(`Initial Urls set to ${iAUrl} for admin and ${iTUrl} for tricky.`);

async function checkAndCountRecords(baseName: string, colName: string): Promise<void> {
  const client = new MongoClient(iAUrl);

  try {
    await client.connect();

    var database: Db = client.db(baseName);
    const collections = await database.listCollections().toArray();

    // Check if the collection exists
    const collectionExists = collections.some((coll) => coll.name === colName);

    if (collectionExists) {
      const collection: Collection = database.collection(colName);

      // Get the document count in the collection
      const documentCount: number = await collection.countDocuments();

      logger.info(`Collection "${colName}" exists. Document count: ${documentCount}`);
    } else {
      logger.info(`Collection "${colName}" does not exist.`);
      createAdmins();
    }
  } catch (error) {
    logger.error(`Error checking and counting records: ${(error as Error).message}`);
  } finally {
    await client.close();
  }
}

checkAndCountRecords(dbNameAdmin!, "users");

async function createAdmins(): Promise<void> {
  try {
      var id = await AdminCounter.incrementAdminCounter();      
      // Create the admin user
      const newAdmin = await mAdminUserModel.create({ 
        name: mongoUser,
        pass: mongoPass,
        adminId: id,
        roles: mongoUserRoles,
      });
      logger.info('Admin created:', JSON.stringify(newAdmin));
  } catch (error) {
    logger.error(`Error creating admin record: ${(error as Error).message}`);
  }
  logger.info(`Admin check or create complete.`);
}