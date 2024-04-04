import {config} from 'dotenv'

config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testing-database";

export const PORT = process.env.PORT || 4000;

export const TOKEN_SECRET = 'some secret key'