import { Schema, Model, model, Types } from 'mongoose';
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
  findByEmail(email: string): Promise<mTestUser | null>;
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
  { timestamps: true, collection: 'testUser' }
);

mTestUserSchema.statics.getEmailConfirmationLink = (): string => {
  const t = getRandomToken(12);
  logger.debug(`Token received: ${t}`);
  return t;
}

mTestUserSchema.statics.findByEmail = async function (em: string): Promise<mTestUser | null> {
  try {
    const user = await this.findOne({ email: em });
    logger.debug(`User found by static method: ${JSON.stringify(user)}.`);
    return user;
  } catch (error) {
    logger.error(`Error finding user by email by static method: ${(error as Error).message}`);
    return null;
  }
}

// Instance method to get ObjectId
mTestUserSchema.methods.getObjectId = function (): Types.ObjectId {
  return this._id;
};

export const TestUser = model<mTestUser, mTestUserModel>('testUser', mTestUserSchema, 'testUser');