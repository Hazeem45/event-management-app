import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  PORT: number;
  MONGO_URI: string;
  SECRET_KEY: string;
}

const env: EnvVariables = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  SECRET_KEY: process.env.SECRET_KEY || "",
};

export default env;
