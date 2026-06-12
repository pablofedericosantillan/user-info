/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../users.repository';
import { GetAllUsersRequest, GetAllUsersResponse } from '../../dtos';
import { UserDto } from '../../dtos/get-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserGetService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<UserDto | null> {
    const result = await this.usersRepository.getPaginated(
      { limit: 1, offset: 0 },
      { email },
    );
    if (result.length === 0) return null;
    return plainToInstance(UserDto, result[0], {
      excludeExtraneousValues: true,
    });
  }

  async getAll(params: GetAllUsersRequest): Promise<GetAllUsersResponse> {
    const result = await this.usersRepository.getPaginated(params);

    const entries = result.map((r) =>
      plainToInstance(UserDto, r, { excludeExtraneousValues: true }),
    );

    return {
      entries,
      limit: params.limit,
      offset: params.offset,
    };
  }
}
