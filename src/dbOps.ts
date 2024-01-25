import logger from './logger';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;

export const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;
export const poolSize = `?minPoolSize=1&maxPoolSize=10`;

export const dbNameAdmin = process.env.DB_NAME_ADMIN;
export const dbNameTricky = process.env.DB_NAME_TRICKY;

