import { logger } from "./logger";

export const mongoUrl = 'mongodb://127.0.0.1:27017/';
export const adminDB = 'admin';
export const trickyDB = 'tricky';
export const adminLevel = [
    [0, `Super Admin`],
    [1, `User Admin`],
    [2, `Moderator`],
];

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
});

export class Like {
    private readonly desc: string;
    private readonly score: number;

    constructor (desc: string, score: number) {
        this.desc = desc;
        this.score = score;
    };

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
];

export function getLikeByDesc(s: string) {
    for (var i: number = 1; i < likes.length; i++) {
        if (likes[i].getDesc() == s) {
            return likes[i];
        } else {
            logger.info(`Unable to find like with description ${s}`);
        }
        return undefined;
    }
};

export function getLikeScore(l: Like): number {
    return l.getScore();
};