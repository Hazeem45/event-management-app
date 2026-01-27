import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  PORT: number;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_EMAIL_SECRET: string;
  EMAIL_SMTP_SECURE: boolean;
  EMAIL_SMTP_PASS: string;
  EMAIL_SMTP_USER: string;
  EMAIL_SMTP_PORT: number;
  EMAIL_SMTP_HOST: string;
  EMAIL_SMTP_SERVICE_NAME: string;
  CLIENT_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const env: EnvVariables = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || "",
  EMAIL_SMTP_SECURE: Boolean(process.env.EMAIL_SMTP_SECURE) || false,
  EMAIL_SMTP_PASS: process.env.EMAIL_SMTP_PASS || "",
  EMAIL_SMTP_USER: process.env.EMAIL_SMTP_USER || "",
  EMAIL_SMTP_PORT: Number(process.env.EMAIL_SMTP_PORT) || 462,
  EMAIL_SMTP_HOST: process.env.EMAIL_SMTP_HOST || "",
  EMAIL_SMTP_SERVICE_NAME: process.env.EMAIL_SMTP_SERVICE_NAME || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;
