import nodemailer from 'nodemailer';
import config from '../config/config.js'; // donde tenés process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASS
  }
});

export const sendPurchaseEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"Coder Store" <${config.GMAIL_USER}>`,
    to,
    subject,
    html
  });
};
