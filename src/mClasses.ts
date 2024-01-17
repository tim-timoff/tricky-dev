import * as bcrypt from 'bcrypt';
import { logger } from './logger';
import { adminLevel } from './mConstants';

export class mUser {
  private u1stName: string;
  private u2ndName: string;
  private uName: string;
  private uEmail: string;
  private uPass: string;
  private uEmailConfirmed: boolean;
  private uIsAdmin: boolean;
  private uIsLoggedIn: boolean;
  private uNick: string;
  private uAvatar: mImage | undefined;
  private eMailConfirmationLink: string;

    constructor(email : string, pass : string, firstName : string, secondName? : string, nick? : string) {
      this.u1stName = firstName;
      if (secondName) {
        this.u2ndName = secondName;
      } else {
        this.u2ndName = "";
      }
      this.uName = this.u1stName + " " + this.u2ndName;
      this.uEmail = email;
      this.uPass = "";
      this.uEmailConfirmed = false;
      this.uIsAdmin = false;
      this.uIsLoggedIn = false;
      this.eMailConfirmationLink = "";

      if (!nick) {
        this.uNick = this.uName;
        logger.info(`Empty nick is replaced with name: ${this.uNick}`);
      } else {
        this.uNick = nick;
      }

      // Use an async IIFE (Immediately Invoked Function Expression)
      (async () => {
        try {
          let hashedPass : string | any;

          // Wait for the hashed password
          hashedPass = await getHashed(pass, 10);
          if (typeof hashedPass === 'string') {
            this.uPass = hashedPass;
          } else {
            this.uPass = '';
            logger.error('Failed to hash password!');
          }

          logger.info(`Stored as: ${this.uPass}` + ` of type: ` + typeof this.uPass);
        } catch (e) {
          if (e instanceof Error) {
          // TODO: handle error (send error alert, etc.)
          logger.info(`There was an error while trying to create password: ${e.message}`);
          } else {
            logger.info('Something unclear happened here...');
          }
        }
        // Continue with the rest of the constructor logic
        logger.info(`User created: ${JSON.stringify(this)}`);
      })();
    }

    // class Methods
    public setAdmin() {
      this.uIsAdmin = true;
    };

    public removeAdmin() {
      this.uIsAdmin = false;
    };

    public getName() {
      return this.uName;
    };
};

export class tAdmin extends mUser {
  private mAdminLevel: number;

  constructor(email : string, pass : string, admLvl: number, firstName : string, secondName? : string, nick? : string,) {
    super(email, pass, firstName, secondName, nick);
    super.setAdmin();
    this.mAdminLevel = admLvl;
    logger.info(`Admin created: ${JSON.stringify(this)}`);
  }
};

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

async function getHashed(string: string, rounds: number) {
  try {
    const salt = await bcrypt.genSalt(rounds);
    logger.info(`Salt generated: ${salt}`);

    const hash = await bcrypt.hash(string, salt);
    logger.info(`Hashed password is: ${hash}`);

    return hash;
  } catch (err: any) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      throw err; // TODO send error alert
    }
  }
};

// var admin1 = new mUser("tim.timoff@gmail.com", "agwwbnr", "Tricky", "English", "Tricky");
// var admin2 = new mUser("amusing.english.2018@gmail.com", "Petropavlovsk1949", "Волк", "Волков", "Волчара");
// var admin3 = new mUser("y.timoshenkoff@yandex.ru", "Severodvinsk1937", "Странная", "Личность", "Странник" )