// @flow
import path from 'path';
import dotenvSafe from 'dotenv-safe';

const root = path.join.bind(this, __dirname, '../../');

dotenvSafe.load({
  path: root('.env.dev'),
  sample: root('.env.example'),
});

// Database Settings
export const MONGO_URI = process.env.MONGO || 'mongodb://localhost/myserver';

export const jwtSecret = process.env.SECRET || 'awesome_secret';

export const port = process.env.PORT || 3000;
