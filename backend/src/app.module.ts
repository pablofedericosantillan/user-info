/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { HealthModule } from './controllers/health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';
import { AppConfigModule, AppConfigService } from './common/app-config';
import { createMongooseOptions } from './providers/mongo/mongoose-config';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async (config: AppConfigService) => {
        return createMongooseOptions(config.getConfig().MONGO_URI);
      },
      inject: [AppConfigService],
    }),
    // Controllers
    HealthModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
