import mongoose, { Schema, model } from 'mongoose';
import logger from '../logger';

interface mTestUser {
  id: true;
  email: string;
  emailConfirmed: boolean;
  emailConfirmationLink: string;
  emailLinkSent: [sent: boolean, date: Date];
}

const mTestUserSchema = new Schema<mTestUser>(
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

export const TestUser = model<mTestUser>('mAdminUser', mTestUserSchema, 'testUser');