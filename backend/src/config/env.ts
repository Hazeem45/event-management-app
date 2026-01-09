import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  PORT: number;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_EMAIL_SECRET: string;
}

const env: EnvVariables = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || "",
};

export default env;
