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

const mTestUserSchema: Schema<mTestUser, mTestUserModel> = new Schema(
  {
    email: { type: String, required: true, unique: true, default: "Ваш электронный адрес", index: 1 },
    emailConfirmed: { type: Boolean, default: false },
    emailConfirmationLink: { type: String, default: "" },
    emailLinkSent: [
      {
        sent: { type: Boolean, default: false },
        date: { type: Date, default: new Date('2023-01-01T00:00:00Z+7') }
      }
    ],
  },
  { timestamps: true }
);

mTestUserSchema.statics.getEmailConfirmationLink = (): string =>  {
  const t = getRandomToken(12);
    logger.debug(`Token received: ${t}`);
    return t;
  }

export const TestUser = model<mTestUser, mTestUserModel>('testUser', mTestUserSchema, 'testUser');