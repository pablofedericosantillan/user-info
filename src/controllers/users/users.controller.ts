import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/features/users';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new users',
  })
  async create(
    // @Headers() headers: Headers,
    @Body() payload: any,
  ): Promise<string> {
    return this.userService.create(payload);
  }
}
