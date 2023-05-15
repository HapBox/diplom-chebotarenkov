import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from './config';

export const postgresProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {      
      const sequelize = new Sequelize(sequelizeConfig);
      // Для того чтобы при перезапуске не дропалась БД - комменти 19 и 20 строчки
      // await sequelize.dropSchema('public', {});
      // await sequelize.createSchema('public', {});
      await sequelize.sync();
      return sequelize;
    },
  },
];
