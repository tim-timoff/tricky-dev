import * as bcrypt from 'bcrypt';
import logger from './logger';

export class mImage {
  private path: string;
  private title: string | undefined;
  private caption: string | undefined;

  constructor(path : string, title? : string, caption? : string) {
    this.path = path;
    if(!title) {this.title = title} else {this.title = ``};
    if(!caption) {this.caption = caption} else {this.caption = ``};
    // TODO: get id from the DB
    logger.info(`Image created: ${this.path} titled ${this.title}`);
  }
};

export class mParagraph {
  private pText: string;
  private pImage: mImage | null;

  constructor(text: string) {
    this.pText = text;
    this.pImage = null;
    logger.info(`paragraph created`);
  }

  addtext(text: string) {
    this.pText += text;
  }

  addImage(id: number) { // Image file path
    // TODO: find image in image folder
  }
};

export class mPost {
  private header: string;
  private subheader: string;
  private paragraphs: Array<mParagraph>;
  private likes: Array<number>; // to store Likes ids
  private dateCreated: number;  // timestamp in milliseconds
  private dateUpdated: number;  // timestamp in milliseconds

  constructor() {
    this.header = "";
    this.subheader = "";
    this.paragraphs = [];
    this.likes = [];
    this.dateCreated = Date.now();
    this.dateUpdated = this.dateCreated;
    logger.info(`Post created!`);
  }

  update(): void {
    this.dateUpdated = Date.now();
  }
};

// General functions

export async function getHashed(string: string, rounds: number) {
  try {
    const salt = await bcrypt.genSalt(rounds);
    logger.info(`Salt generated: ${salt}`);

    const hash = await bcrypt.hash(string, salt);
    logger.info(`Hashed string is: ${hash}`);

    return hash;
  } catch (err: any) {
    logger.error(`Error creating hashed string: ${(err as Error).message}`);
  }
};

export function getRandomToken(length: number) : string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  logger.debug(`Token generated: ${token}.`);
  return token;
}

// var admin1 = new mUser("tim.timoff@gmail.com", "agwwbnr", "Tricky", "English", "Tricky");
// var admin2 = new mUser("amusing.english.2018@gmail.com", "Petropavlovsk1949", "Волк", "Волков", "Волчара");
// var admin3 = new mUser("y.timoshenkoff@yandex.ru", "Severodvinsk1937", "Странная", "Личность", "Странник" )