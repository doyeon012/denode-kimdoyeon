import { EnvEnum } from '@enums/env.enum';

export default () => ({
  host: process.env.HOST || 'http://localhost:3000',
  port: parseInt(process.env.PORT || '3000', 10),
  env: EnvEnum[process.env.NODE_ENV || 'DEV'],
  auth: {
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY  || 'denode_access_token_secret_key',
    REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY || 'denode_refresh_token_secret_key',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'denode',
  },
});
