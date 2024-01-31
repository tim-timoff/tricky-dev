import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import logger from './logger';
import { checkAndCountRecords } from './dbOps';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';

const p = './cfg/counters.json';
const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });
const dbNameAdmin = process.env.DB_NAME_ADMIN;
const dbNameTricky = process.env.DB_NAME_TRICKY;

export class Counter {
    private admCounter: number;
    private userCounter: number;
    private gmailCounter: { counter: number, date: Date | undefined}; 
    private curDate: Date;
    private fileDate: Date | undefined;

    constructor() {
        this.admCounter = -1;
        this.userCounter = -1;
        this.gmailCounter = { counter: -1, date: undefined };
        this.curDate = new Date();
        this.curDate.setMinutes(0);
        this.curDate.setSeconds(0);
        this.curDate.setMilliseconds(0);
        this.fileDate = undefined;
        this.loadCounters();
    }

    private async loadCounters(): Promise<void> {
        try {
            if (existsSync(p)) {
                const counterJsonStr = await fs.readFile(p, 'utf-8');
                const counters = JSON.parse(counterJsonStr);
                logger.debug(`Data has been read: ${JSON.stringify(counters)}`);
                // reading gmail notification from the file
                this.gmailCounter = counters.gmailCounter.notifications || 0;
                // checking other counters with database
                this.admCounter = await checkAndCountRecords(dbNameAdmin as string, 'users');
                this.userCounter = await checkAndCountRecords(dbNameTricky as string, 'tUsers');          
            } else {
                // File doesn't exist, initialize counters
                this.admCounter = 0;
                this.userCounter = 0;
                this.gmailCounter.counter = 0;
                this.gmailCounter.date = this.curDate;
                logger.info(`Counter file not found, created new...`);
                this.saveCounters()
            }
        } catch (error) {
            logger.error(`Error loading counters: ${(error as Error).message}`);
        }
    }

    private async saveCounters(): Promise<void> {
        const counters = {
            admCounter: this.admCounter,
            userCounter: this.userCounter,
            gmailCounter: { 
                notifications: this.gmailCounter.counter,
                date: this.gmailCounter.date
            }
        };

        try {
            await fs.writeFile(p, JSON.stringify(counters, null, 2), 'utf-8');
            logger.debug(`Counter file saved.`)
        } catch (error) {
            logger.error(`Error saving counters: ${(error as Error).message}`);
        }
    }

    // Static method to increment admin counter
    static async incrementAdminCounter(): Promise<number> {
        const counterInstance = new Counter();
        counterInstance.admCounter++;
        await counterInstance.saveCounters();
        return counterInstance.admCounter;
    }

    // Static method to increment user counter
    static async incrementUserCounter(): Promise<number> {
        const counterInstance = new Counter();
        counterInstance.userCounter++;
        await counterInstance.saveCounters();
        return counterInstance.userCounter;
    }

    static async incrementGmailCounter(): Promise<number> {
        const counterInstance = new Counter();
        const diff = counterInstance.curDate.getTime() - counterInstance.fileDate!.getTime();
        const hourDiff = diff/(1000*60*60);
        if (hourDiff > 24) {
            // resetting the gmail.counter
            logger.debug (`Gmail counter: the difference with the file date is over ${hourDiff}. Resetting...`)
            counterInstance.gmailCounter.counter = 1;
        } else {
            counterInstance.gmailCounter.counter++;
            logger.debug (`Gmail counter: the difference with the file date is ${hourDiff}. Incrementing...`)
        }
        counterInstance.gmailCounter.date = counterInstance.curDate;
        await counterInstance.saveCounters();
        return counterInstance.gmailCounter.counter;
    }
}

var c = new Counter();
