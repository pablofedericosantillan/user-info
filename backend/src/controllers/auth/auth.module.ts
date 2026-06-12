import { Module } from '@nestjs/common';
import { AuthModuleBase } from 'src/features/auth/auth.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthModuleBase],
  controllers: [AuthController],
})
export class AuthModule {}
