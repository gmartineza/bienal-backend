import dotenv from 'dotenv';

dotenv.config();

export const URL_FRONTEND = process.env.URL_FRONTEND;
export const SECRET_KEY = process.env.SECRET_KEY;
export const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || 60;
