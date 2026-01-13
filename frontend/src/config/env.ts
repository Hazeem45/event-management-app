interface EnvVariables {
  API_URL: string;
}

const env: EnvVariables = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "",
};

export default env;
