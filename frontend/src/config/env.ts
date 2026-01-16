interface EnvVariables {
  API_URL: string;
  AUTH_SECRET: string;
}

const env: EnvVariables = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  AUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
};

export default env;
