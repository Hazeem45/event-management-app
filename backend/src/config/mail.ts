import nodemailer from "nodemailer";
import env from "./env";

export const tranporter = nodemailer.createTransport({
  service: env.EMAIL_SMTP_SERVICE_NAME,
  host: env.EMAIL_SMTP_HOST,
  port: env.PORT,
  secure: env.EMAIL_SMTP_SECURE,
  auth: {
    user: env.EMAIL_SMTP_USER,
    pass: env.EMAIL_SMTP_PASS,
  },
  requireTLS: true,
});
