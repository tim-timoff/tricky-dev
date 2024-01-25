import { Schema, model } from 'mongoose';
import { MongoClient } from 'mongodb';
import { dbNameTricky, poolSize, dbHost, dbPort } from './dbOps';
import logger from './logger';

interface mTestUser {
  id: true;
  email: string;
  emailConfirmed: boolean;
  emailConfirmationLink: string;
  emailLinkSent: [sent: boolean, date: Date];
}

const mTestUserSchema = new Schema<mTestUser>(
  {
    email: { type: String, required: true, unique: true, default: "Ваш электронный адрес" },
    emailConfirmed: { type: Boolean, default: false },
    emailConfirmationLink: { type: String, default: "" },
    emailLinkSent: [
      {
        sent: { type: Boolean, default: false },
        date: { type: Date, default: new Date('2023-01-01T00:00:00Z+7') }
      }
    ]
  },
  { timestamps: true }
);

const TestUser = model<mTestUser>('mAdminUser', mTestUserSchema, 'testUser');

// This is to be transferred later to another module
const url = `mongodb://${dbHost}:${dbPort}/` + dbNameTricky + poolSize;
logger.debug(`Mongo url is set to: ${url}`);
const client = new MongoClient(url);

client.on("connected", () => {
  logger.debug(`Connection to database ${dbNameTricky} established.`)
})

try {
  client.connect;
  try {
    const me = async () => {
      await TestUser.create({ email: "tim.timoff@gmail.com" });
    }
    logger.info(`Test user created: ${JSON.stringify(me)}`);
  } catch (err) {
    logger.error(`Error creating test user: ${(err as Error).message}`);
  }
} catch (err) {
    logger.error(`Error connecting to database: ${(err as Error).message}.`);
} finally {
  client.close;
}