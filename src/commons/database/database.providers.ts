import datasource from '../../../config/datasource';

export const databaseProviders = [
  {
    provide: 'DataSource',
    useFactory: async () => {
      return datasource.initialize();
    },
  },
];
