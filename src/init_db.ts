import { logger } from './logger';
import * as fs from 'fs';
import { admClient, trickyClient } from './dp_ops';

const adminPath = './cfg/admins.json';

var adminData: any[] = [];

try {
  const jsonStr = fs.readFileSync(adminPath, 'utf-8');
  adminData = JSON.parse(jsonStr);
  // logger.info(`Successfully parsed: ${JSON.stringify(arrayOfAdmins)}`);
} catch (err) {
  logger.error(`Error reading json file: ${(err as Error).message}`);
};

const adminsArray = Object.values(adminData);



for (const admin of adminsArray) {
  logger.info(`Admin: ${JSON.stringify(admin)}`);
}