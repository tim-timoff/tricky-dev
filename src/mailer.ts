import nodemailer from 'nodemailer';
import logger from './logger';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import { TestUser } from './models/mTestUserModel';
import { composeEmail } from './emails/testUserEmails';
import { emailMessageType, emailSubjectType, getEmailSubjectString } from './mConstants';
import mongoose from 'mongoose';
import { getMongoUri } from './resolver';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

const acc = process.env.MAIL_ACC;
const pass = process.env.MAIL_PASS;
const addr = process.env.MAIL_NOREPLY as string;
const dbNameTricky = process.env.DB_NAME_TRICKY as string;
const mong = getMongoUri() + dbNameTricky;

logger.debug(`Mongo uri defined like: ${mong}, no replay is read as: ${addr}`);

var htmlContent: string;

// Create a Nodemailer transporter
function getTrasnporter(): nodemailer.Transporter {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: acc,
      pass: pass,
    },
  });
  return transporter;
}

async function sendEmail(from: string, to: string, subj: string, html: string): Promise<boolean> {
  try {
    const t = getTrasnporter();
    logger.debug(`From address is set to: ${from}`);

    // Options for the email
    const mailOptions: nodemailer.SendMailOptions = {
      from: from,
      to: to,
      subject: subj,
      html: html,
    };

    // Send the email
    const info = await t.sendMail(mailOptions);

    logger.info(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${(error as Error).message}, details: ${(error as Error).stack}`);
  } finally {
    return false;
  }
}

async function sendEmailConfirmationLink(email: string): Promise<boolean> {
  let res = false;
  await mongoose.connect(mong);
  const u = await TestUser.findByEmail(email);
  if (u) {
    logger.info(`User with email ${email} has been fetched from db.`);
    // Now sending the email
    const t = composeEmail(emailMessageType.testUserEmailConfirmationLink, u);
    if (t) {
      sendEmail(addr, u.email, getEmailSubjectString(emailSubjectType.actionRequired), t);
      logger.info('Sending email confirmation link succeded');
    } else {
      logger.info('Sending email confirmation link failed');
    }
    res = true;
  } else {
    logger.warn(`Failed to find test user with email: ${email}`);
  }
  return res;
}

// result link: http://trickyenglish.media/tu/emailconfirmation?u=65bc849dc68a11501cb28ca2&l=EkJRyodXzoQU

const result = sendEmailConfirmationLink("tim.timoff@gmail.com");

// Invoke the function to send the email
// const result = sendEmail().then
// logger.info(`Sendmail result: ${result}`);