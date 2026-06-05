import { MongooseModuleOptions } from '@nestjs/mongoose';
import { SoftDeleteInterface } from 'mongoose-delete';

const indexFields: Array<keyof SoftDeleteInterface> = ['deleted'];

export const pluginConfigSoftDelete = {
  deletedAt: true,
  overrideMethods: true,
  indexFields,
};

export const createMongooseOptions = (uri: string): MongooseModuleOptions => {
  return {
    uri,
    connectionFactory: (connection) => {
      connection.plugin(require('mongoose-delete'), pluginConfigSoftDelete);
      return connection;
    },
  };
};
