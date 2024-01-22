require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import logger from "./logger";

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
export const dbPass = process.env.DB_PASS;

// const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

export const mongoUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/`;
export const initMongoUrl = `mongodb://${dbHost}:${dbPort}/`;
export const dbNameAdmin = process.env.DB_NAME_ADMIN;
export const dbNameTricky = process.env.DB_NAME_TRICKY;
export const poolSize = `?minPoolSize=5&maxPoolSize=20`;

export const adminLevel = [
    [0, `Super Admin`],
    [1, `User Admin`],
    [2, `Moderator`],
]

export class Like {
    private readonly desc: string;
    private readonly score: number;

    constructor (desc: string, score: number) {
        this.desc = desc;
        this.score = score;
    }

    public getDesc(): string {
        return this.desc;
    }

    public getScore(): number {
        return this.score;
    }
}

const thumbUp = new Like("thumb up", 1);
const lol = new Like("lol", 1);
const onFire = new Like("on fire", 2);
const thumbDown = new Like("thumb down", -1);
const shit = new Like("shit", -2);
const vomit = new Like("vomit", -2);

export const likes: Array<Like> = [
    thumbUp, lol, onFire, thumbDown, shit, vomit
]

export function getLikeByDesc(s: string) {
    for (var i: number = 1; i < likes.length; i++) {
        if (likes[i].getDesc() == s) {
            return likes[i];
        } else {
            logger.info(`Unable to find like with description ${s}`);
        }
        return undefined;
    }
}

export function getLikeScore(l: Like): number {
    return l.getScore();
}