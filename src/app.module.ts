/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { HealthModule } from './controllers/health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './controllers/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_ATLAS_URI,
        onConnectionCreate: (connection: Connection) => {
          return connection;
        },
      }),
    }),
    // Controllers
    HealthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
