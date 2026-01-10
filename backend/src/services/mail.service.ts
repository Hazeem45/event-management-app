import path from "path";
import ejs from "ejs";
import { tranporter } from "../config/mail";
import env from "../config/env";

interface ISendMailOptions {
  to: string;
  subject: string;
  html: string;
}

interface IRenderHtmlOptions {
  template: string;
  data: Record<string, any>;
}

export const renderHtml = async ({ template, data }: IRenderHtmlOptions) => {
  const templatePath = path.join(
    __dirname,
    `../templates/emails/${template}.ejs`
  );

  return ejs.renderFile(templatePath, data);
};

export const sendMail = async ({ to, subject, html }: ISendMailOptions) => {
  return await tranporter.sendMail({
    from: env.EMAIL_SMTP_USER,
    to,
    subject,
    html,
  });
};
