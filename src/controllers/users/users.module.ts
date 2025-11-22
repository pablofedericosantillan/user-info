import { Module } from '@nestjs/common';
import { UsersModuleBase } from 'src/features/users';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersModuleBase],
  providers: [],
  controllers: [UsersController],
})
export class UserModule {}
