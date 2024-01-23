import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import logger from './logger';

const path = './cfg/counters.json';

export class AdminCounter {
    private admCounter: number;
    private userCounter: number

    constructor() {
        this.admCounter = -1;
        this.userCounter = -1;
        this.loadCounters();
    }

    private async loadCounters(): Promise<void> {
        try {
            if (existsSync(path)) {
                const counterJsonStr = await fs.readFile(path, 'utf-8');
                const counters = JSON.parse(counterJsonStr);

                this.admCounter = counters.admCounter || 0;
                this.userCounter = counters.userCounter || 0;
            } else {
                // File doesn't exist, initialize counters
                this.admCounter = 0;
                this.userCounter = 0;
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
        };

        try {
            await fs.writeFile(path, JSON.stringify(counters, null, 2), 'utf-8');
            logger.debug(`Counter file saved.`)
        } catch (error) {
            logger.error(`Error saving counters: ${(error as Error).message}`);
        }
    }

    // Static method to increment admin counter
    static async incrementAdminCounter(): Promise<number> {
        const counterInstance = new AdminCounter();
        counterInstance.admCounter++;
        await counterInstance.saveCounters();
        return counterInstance.admCounter;
    }

    // Static method to increment user counter
    static async incrementUserCounter(): Promise<number> {
        const counterInstance = new AdminCounter();
        counterInstance.userCounter++;
        await counterInstance.saveCounters();
        return counterInstance.userCounter;
    }
}