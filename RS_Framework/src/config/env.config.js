const path = require('path');
const dotenv = require('dotenv');


const ENV = process.env.ENV || 'qa';
const VALID_ENVS = ['dev', 'qa', 'prod'];


if (!VALID_ENVS.includes(ENV)) {
 throw new Error(
   `Invalid ENV "${ENV}". Expected one of: ${VALID_ENVS.join(', ')}`,
 );
}


const envFile = path.resolve(__dirname, `../../env/.env.${ENV}`);
dotenv.config({ path: envFile, override: true });


const config = {
 env: ENV,
 baseUrl: process.env.BASE_URL,
 apiUrl: process.env.API_URL,
 defaultUser: {
   username: process.env.USER_EMAIL,
   password: process.env.USER_PASSWORD,
 },
 timeouts: {
   action: Number(process.env.ACTION_TIMEOUT) || 15_000,
   navigation: Number(process.env.NAVIGATION_TIMEOUT) || 30_000,
   expect: Number(process.env.EXPECT_TIMEOUT) || 20_000,
   test: Number(process.env.TEST_TIMEOUT) || 90_000,
 },
 retries: Number(process.env.RETRIES) || 0,
 workers: Number(process.env.WORKERS) || 4,
 headless: process.env.HEADLESS !== 'false',
};


if (!config.baseUrl) {
 throw new Error(`BASE_URL is not set for ENV=${ENV}. Check env/.env.${ENV}`);
}


module.exports = config;
