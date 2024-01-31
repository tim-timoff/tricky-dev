import nodemailer from 'nodemailer';
import logger from './logger'; 
require('dotenv').config();
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '/home/tim/Documents/.env');
dotenv.config({ path: envPath });

const acc = process.env.MAIL_ACC;
const pass = process.env.MAIL_PASS;
const addr = process.env.MAIL_NOREPLY;

async function sendEmail(): Promise<boolean> {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: acc,
        pass: pass,
      },
    });

    // HTML content for the email
    const htmlContent = `
      <html>
        <head>
          <style>
            /* Your CSS styles here */
            body {
              font-family: Arial, sans-serif;
            }
            h1 {
              color: #3498db;
            }
          </style>
        </head>
        <body>
          <h1>Hello, this is a styled email again!</h1>
          <p>Additional content goes here.</p>
        </body>
      </html>
    `;

    // Options for the email
    const mailOptions: nodemailer.SendMailOptions = {
      from: addr,
      to: 'tim.timoff@gmail.com',
      subject: 'Styled Email',
      html: htmlContent,
    }; 

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    logger.info(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email: ${(error as Error).message}, details: ${(error as Error).stack}`);
  } finally {
    return false;
  }
}

// Invoke the function to send the email
const result = sendEmail().then
logger.info(`Sendmail result: ${result}`);