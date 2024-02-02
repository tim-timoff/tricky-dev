import nodemailer from 'nodemailer';
import logger from './logger';
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';
import { c } from './counters';
import { checkAndCountRecords } from './dbOps';
import { TestUser } from './models/mTestUserModel';
import { composeEmail } from './emails/testUserEmails';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });
const counter = c;

const acc = process.env.MAIL_ACC;
const pass = process.env.MAIL_PASS;
const addr = process.env.MAIL_NOREPLY;
const dbNameTricky = process.env.DB_NAME_TRICKY as string;

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

async function sendEmailConfirmationLink(email: string) : Promise<boolean> {
  let res = false;
  if (await checkAndCountRecords(dbNameTricky, 'testUser') == 0) {
    logger.info(`Test users collection is empty`);
  } else {
    const u = await TestUser.findByEmail(email)
    if (u) {
      logger.info(`User fatched from db: ${JSON.stringify(u)}`);
      return true;
    } else {
      logger.warn(`Failed to find test user with email: ${email}`);
    }
  }
  return res;
}

sendEmailConfirmationLink("tim.timoff@gmail.com");

// Invoke the function to send the email
// const result = sendEmail().then
// logger.info(`Sendmail result: ${result}`);