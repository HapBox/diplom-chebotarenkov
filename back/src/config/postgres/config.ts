import { SequelizeOptions } from 'sequelize-typescript';
import { POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME } from '../app/app.config';

export const sequelizeConfig: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USERNAME,
  dialect: 'postgres',
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  models: [__dirname + '/models/final/*.model.*', __dirname + '/models/relations/*.model.*'],
}
