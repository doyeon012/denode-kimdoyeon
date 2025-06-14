import { EnvEnum } from 'src/enums/env.enum';

export default () => ({
  host: process.env.HOST || 'http://localhost:3000',
  port: parseInt(process.env.PORT || '3000', 10),
  env: EnvEnum[process.env.NODE_ENV || 'DEV'],
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'denode',
  },
});
