import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { Controller, Post, Body, Query, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Dtos, UserCreateService, UserGetService } from 'src/features/users';

@ApiTags('Users')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly userGetService: UserGetService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create new users',
  })
  async create(
    @Body() payload: Dtos.CreateUserRequest,
  ): Promise<{ id: string }> {
    return this.userCreateService.create(payload);
  }

  @Get()
  @ApiOperation({
    summary: 'Get users',
  })
  async getAll(
    @Query() dto: Dtos.GetAllUsersRequest,
  ): Promise<Dtos.GetAllUsersResponse> {
    return this.userGetService.getAll(dto);
  }
}
