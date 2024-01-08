require('dotenv').config();
export const host = process.env.DB_HOST;
export const database = process.env.DB_DATABASE;
export const username = process.env.DB_USERNAME;
export const password = process.env.DB_PASSWORD;