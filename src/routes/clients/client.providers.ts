import { DataSource } from 'typeorm';
import { Client } from './entities/client.entity';

export const clientProviders = [
  {
    provide: 'ClientRepo',
    useFactory: (datasource: DataSource) => datasource.getRepository(Client),
    inject: ['DataSource'],
  },
];
