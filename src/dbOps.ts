import logger from './logger';
import { MongoClient } from 'mongodb';
import { mongoUrl, dbNameAdmin, dbNameTricky, initMongoUrl, poolSize } from './mConstants';

const aUrl = mongoUrl + dbNameAdmin + poolSize;
export const iAUrl = initMongoUrl + dbNameAdmin + poolSize;
const tUrl = mongoUrl + dbNameTricky + poolSize;
export const iTUrl = initMongoUrl + dbNameTricky + poolSize;

export const admClient = new MongoClient(aUrl);
export const initAdmClient = new MongoClient(iAUrl);
export const trickyClient = new MongoClient(tUrl);
export const initTrickyClient = new MongoClient(iTUrl);

// Add an event listener for the 'poolCreated' event
admClient.on('poolCreated', (event) => {
    logger.info(`Connection pool created for admin client, using url: ${aUrl} `, event);
});

// Add an event listener for the 'poolCreated' event
trickyClient.on('poolCreated', (event) => {
    logger.info(`Connection pool created for tricky client, using url: ${tUrl}`, event);
});

admClient.on('closed', (event) => {
    logger.info(`Connection closed and admin client instance destroyed`, event);
});

trickyClient.on('closed', (event) => {
    logger.info(`Connection closed and tricky client instance destroyed`, event);
});