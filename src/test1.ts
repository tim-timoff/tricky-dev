import logger from './logger';
import * as fs from 'fs';

const adminPath = './cfg/admins.json';

let arrayOfAdmins: Array<any> = [];

try {
  const jsonStr = fs.readFileSync(adminPath, 'utf-8');
  arrayOfAdmins = JSON.parse(jsonStr);
  logger.info(`Sucesfully parsed: ${JSON.stringify(arrayOfAdmins)}`);
} catch (err) {
  logger.error(`Error reading json file ` + (err as Error).message);
};

import { MongoClient } from 'mongodb';

async function createUser() {
  const client = new MongoClient('mongodb://localhost:27017', { });

  try {
    await client.connect();

    const adminDb = client.db('admin'); // Connect to the 'admin' database
    const usersCollection = adminDb.collection('users'); // Assume you have a 'users' collection in the 'admin' database

    // Create a new admin user
    const newUser = {
      user: 'adminUser',
      pwd: 'adminPassword',
      roles: [
        { role: 'readWriteAnyDatabase', db: 'admin' },
        { role: 'dbAdminAnyDatabase', db: 'admin' },
      ],
    };

    await usersCollection.insertOne(newUser);
    console.log('Admin user created successfully.');
  } finally {
    await client.close();
  }
}

createUser();

var adminData: any[] = [];

for (const admin of arrayOfAdmins) {
  logger.info(`Admin: ${JSON.stringify(admin)}`);
}
