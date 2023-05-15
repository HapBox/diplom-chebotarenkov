import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_KEY: string = process.env.JWT_KEY || 'Jsaj@#!Sd234ds';

export const POSTGRES_HOST: string = process.env.POSTGRES_HOST;
export const POSTGRES_PORT: number = Number(process.env.POSTGRES_PORT);
export const POSTGRES_USERNAME: string = process.env.POSTGRES_USERNAME;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DATABASE: string = process.env.POSTGRES_DATABASE;

export const REDIS_DB_URL: string = process.env.REDIS_DB_URL;
export const REDIS_PORT: string = process.env.REDIS_PORT;
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD;
export const REDIS_DB_NUMBER: string = process.env.REDIS_DB_NUMBER || '0';

export const LISTEN_PORT: number = Number(process.env.LISTEN_PORT) || 3000;

export const EMAIL_LOGIN: string = process.env.EMAIL_LOGIN;
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD;

export const FRONT_URL: string = process.env.FRONT_URL;
