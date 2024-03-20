import { config } from "dotenv";
config();

const envConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH,
};

export default envConfig;
