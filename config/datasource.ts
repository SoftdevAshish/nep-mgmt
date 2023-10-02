import { DataSource, DataSourceOptions } from 'typeorm';
import {
  database,
  host,
  logging,
  password,
  port,
  synchronize,
  username,
} from './config';

export const databaseConfiguration: DataSourceOptions = {
  type: 'mysql',
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: synchronize,
  migrationsRun: true,
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  logging: logging,
};

const dataSource = new DataSource(databaseConfiguration);
export default dataSource;
