import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'UserRepo',
    useFactory: (datasource: DataSource) => datasource.getRepository(User),
    inject: ['DataSource'],
  },
];
