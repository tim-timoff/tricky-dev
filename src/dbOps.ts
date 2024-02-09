import logger from './logger';
import mongoose from 'mongoose';
import { MongoClient, Db, Collection } from 'mongodb';
import { TestUser } from './models/mTestUserModel';
import { getDBHost, getDBPort} from './resolver';

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const dbHost = getDBHost();
const dbPort = getDBPort();

const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;
const poolSize = `?minPoolSize=1&maxPoolSize=10`;

const dbNameAdmin = process.env.DB_NAME_ADMIN as string;
const dbNameTricky = process.env.DB_NAME_TRICKY as string;

logger.debug(`Database name read is: ${dbNameTricky}`);

// This is to be transferred later to another module
var url = `mongodb://${dbHost}:${dbPort}/`;
// logger.debug(`Mongo url is set to: ${url}`);

export async function findOrCreateTUser(e: string): Promise<void> {
    let user = null;
    await connectDB(dbNameTricky);
    var query = TestUser.findOne({ email: e });
    user = await query.exec();
    if (user !== null) {
        logger.info(`User found: ${JSON.stringify(user)}.`);
    } else {
        logger.info(`User with email: ${e} wasn't found. Creating...`);
        const link = TestUser.getEmailConfirmationLink();
        const data = { "email": e, "emailConfirmationLink": link };
        const n = new TestUser(data);
        n.updateOne({ emailConfirmationLink: link });
        try {
            await n.save();
            logger.info(`Test user: ${JSON.stringify(n)} created with ${JSON.stringify(data)}.`);
        } catch (err) {
            logger.error(`Error creating test user: ${(err as Error).message}`);
        }
    }
    disconnectDB;
}

async function connectDB(dbName: string) {
    await mongoose.connect(url + dbName);
    logger.debug(`Connected to database ${dbName}`);
}

async function disconnectDB() {
    await mongoose.disconnect();
    logger.debug(`Disconnected from database...`);
}

export async function checkAndCountRecords(baseName: string, colName: string): Promise<number> {
    const mUrl = url + baseName;
    logger.debug(`Trying to connect to ${mUrl}...`)
    const client = new MongoClient(mUrl);
    let documentCount = 0;

    try {
        await client.connect();

        let database: Db = client.db(baseName);
        const collections = await database.listCollections().toArray();
        // Check if the collection exists
        const collectionExists = collections.some((coll) => coll.name === colName);

        if (collectionExists) {
            const collection: Collection = database.collection(colName);
            // Get the document count in the collection
            documentCount = await collection.countDocuments();
            logger.info(`Collection "${colName}" exists. Document count: ${documentCount}`);
        } else {
            logger.info(`Collection "${colName}" does not exist.`);
        }
    } catch (error) {
        logger.error(`Error checking and counting records: ${(error as Error).message}`);
    } finally {
        client.close().then
        logger.debug(`Check & Count collection ${colName} completed.`);
    }
    return documentCount;
}

// const tU = findOrCreateTUser("tim.timoff@gmail.com");