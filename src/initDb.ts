require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import logger from './logger';
import { Counter } from './counters';

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