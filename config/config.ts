import { config } from 'dotenv';
import * as process from 'process';

config();
export const appPort = parseInt(process.env.APP_PORT);

export const host = process.env.MYSQL_HOST;

export const port = parseInt(process.env.MYSQL_PORT);

export const username = process.env.MYSQL_USERNAME;

export const password = process.env.MYSQL_PASSWORD;
export const database = process.env.MYSQL_DATABASE;
export const synchronize = JSON.parse(process.env.MYSQL_SYNCHRONIZE);
export const logging = JSON.parse(process.env.MYSQL_LOGGING);

export const swaggerTitle = process.env.API_TITLE;
export const swaggerDescription = process.env.API_DESCRIPTION;
export const swaggerVersion = process.env.API_VERSION;
export const swaggerDocs = process.env.API_DOCS;
