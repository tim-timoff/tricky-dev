require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import logger from './logger';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

// This is global, change accordingly
const mEnv = process.env.NODE_ENV as string;
logger.debug(`Environment has been set to ${mEnv}.`);

export function getHost() {
    if (mEnv == "dev") {
        return process.env.HOST_DEV as string;
    } else if (mEnv == "prod") {
        return process.env.HOST_PROD as string;
    }
    logger.warn(`Environment wasn't set...`)
    return "";
}

export function getPort() {
    if (mEnv == "dev") {
        return process.env.PORT_DEV as string;
    } else if (mEnv == "prod") {
        return process.env.PORT_PROD as string;
    }
    logger.warn(`Environment wasn't set...`)
    return "";
}

export function getAdminPort() {
    return process.env.ADMIN_PORT as string;
}

export function getDBHost() {
    if (mEnv == "dev") {
        return process.env.DB_HOST_DEV as string;
    } else if (mEnv == "prod") {
        return process.env.DB_HOST_PROD as string;
    }
    logger.warn(`Environment wasn't set...`)
    return "";
}

export function getDBPort() {
    if (mEnv == "dev") {
        return process.env.DB_PORT_DEV as string;
    } else if (mEnv == "prod") {
        return process.env.DB_PORT_PROD as string;
    }
    logger.warn(`Environment wasn't set...`)
    return "";
}

export function getMongoUri() {
    if (mEnv == "dev") {
        return process.env.MONGO_URI_DEV as string;
    } else if (mEnv == "prod") {
        return process.env.MONGO_URI_PROD as string;
    }
    logger.warn(`Environment wasn't set...`)
    return "";
}

// URL resolver function
export function urlResolver(type: string, params: any): string {
    switch (type) {
        case 'welcome':
            return "slug";
    }
    logger.warn(`Url wasn't resolved: ${type}`);
    return "";
}