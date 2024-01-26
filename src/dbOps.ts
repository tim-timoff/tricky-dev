import logger from './logger';
import mongoose from 'mongoose';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import { TestUser } from './models/mTestUserModel';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;
const poolSize = `?minPoolSize=1&maxPoolSize=10`;

const dbNameAdmin = process.env.DB_NAME_ADMIN;
const dbNameTricky = process.env.DB_NAME_TRICKY;

// This is to be transferred later to another module
var url = `mongodb://${dbHost}:${dbPort}/`;
logger.debug(`Mongo url is set to: ${url}`);

async function findTestUser (email: string): Promise<boolean> {
    let result = false;
    mongoose.connect(url).then
    mongoose.connection.useDb(dbNameTricky! as string);
    var query = TestUser.findOne({ email: email});
    query.exec()
    .then (user => {
        logger.info(`The Query result is: ${JSON.stringify(user)}`);
        if (user) {
            result = true;
        }
    })
    mongoose.disconnect;
    return result;
}

findTestUser("tim.timoff@gmail.com");

// try {
//   mongoose.connect(url);
//   mongoose.connection.useDb(dbNameTricky!);
//   if (mongoose.ConnectionStates.connected) {
//     logger.debug(`Mongoose is connected...`);
//   } else {
//     logger.debug(`Mongoose is not connected...`);
//   }
// } catch (err) {
//   logger.error(`Error connecting to database: ${(err as Error).message}.`);
// } finally {
//   mongoose.disconnect;
// }

// try {
//     mongoose.connect(url);
//     const conn = mongoose.connection.useDb("tricky");
//     const meData = new TestUser({ email: 'tim.timoff@gmail.com' });
//     // const me = createTUser(meData);
//     // logger.info(`User created: ${JSON.stringify(me)} of type: ${typeof(me)}`);
//     logger.info(`Retreiving info from db: ${conn.db.databaseName}, content: ${conn.db.collections.name.length}`);
//   } catch (err) {
//     logger.error(`Error creating test user: ${(err as Error).message}`);
//   } finally {
//     logger.info(`DB operations completed.`)
//     mongoose.disconnect;
// }

async function createTUser(t: any) {
  TestUser.create(t);
}

