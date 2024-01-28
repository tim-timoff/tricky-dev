import logger from './logger';
import mongoose from 'mongoose';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import { TestUser } from './models/mTestUserModel';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const dbHost = process.env.DB_HOST as string;
const dbPort = process.env.DB_PORT as string;

const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;
const poolSize = `?minPoolSize=1&maxPoolSize=10`;

const dbNameAdmin = process.env.DB_NAME_ADMIN as string;
const dbNameTricky = process.env.DB_NAME_TRICKY as string;

// This is to be transferred later to another module
var url = `mongodb://${dbHost}:${dbPort}/`;
logger.debug(`Mongo url is set to: ${url}`);

async function findTUser(e: string): Promise<boolean> {
    let result = false;
    let user = undefined;
    await connectDB(dbNameTricky);
    var query = TestUser.findOne({ email: e });
    user = await query.exec()
    if (user !== undefined) {
        logger.info(`User found: ${JSON.stringify(user)}`);
        result = true;
    } else {
        logger.info(`User with email: ${e} wasn't found.`)
    }
    disconnectDB;
    return result;
}

async function createTUser(e: string) {
    const data = { "email": e };
    const n = new TestUser(data);
    await connectDB(dbNameTricky);
    const res = await findTUser(e);
    logger.debug(`Find test user result: ${res}`);
    if (res == false) {
        try {
            await n.save();
            logger.info(`Test user: ${JSON.stringify(n)} created with ${JSON.stringify(data)}.`);
        } catch (err) {
            logger.error(`Error creating test user: ${(err as Error).message}`);
        }
    } else {
        await disconnectDB();
    }
}

async function connectDB(dbName: string) {
    await mongoose.connect(url);
    mongoose.connection.useDb(dbName);
    logger.debug(`Connected to database ${dbName}`);
}

async function disconnectDB() {
    mongoose.disconnect;
    logger.debug(`Disconnected from database...`);
}

createTUser("y.timoshenkoff@yandex.ru");