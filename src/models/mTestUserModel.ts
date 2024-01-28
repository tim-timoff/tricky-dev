import mongoose, { Schema, Model, model } from 'mongoose';
import { getRandomToken } from '../mFunctions';
import logger from '../logger';

interface mTestUser {
  id: true;
  email: string;
  emailConfirmed: boolean;
  emailConfirmationLink: string;
  emailLinkSent: [sent: boolean, date: Date];
}

interface mTestUserModel extends Model<mTestUser> {
  getEmailConfirmationLink(): string;
}

const mTestUserSchema = new Schema<mTestUser, mTestUserModel>(
  {
    email: { type: String, required: true, unique: true, default: "Ваш электронный адрес", index: 1 },
    emailConfirmed: { type: Boolean, default: false },
    emailConfirmationLink: { type: String, default: "" },
    emailLinkSent: [
      {
        sent: { type: Boolean, default: false },
        date: { type: Date, default: new Date('2023-01-01T00:00:00Z+7') }
      }
    ]
  },
  { timestamps: true }
);

mTestUserSchema.static('getEmailConfirmationLink', ( ) : string =>  {
  const t = getRandomToken(12);
  logger.debug(`Token received: ${t}`);
  return t;
});

// userSchema.static('hashPassword', (password: string): string => {
//   return bcrypt.hashSync(password);
// });

export const TestUser = model<mTestUser>('testUser', mTestUserSchema, 'testUser');