import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose({ name: '_id' })
  @ApiProperty({
    description: 'Associated Account ID',
    example: '4bc67acd-8bb5-4d8f-8ea4-d88327d54233',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Email',
    example: '4bc67acd-8bb5-4d8f-8ea4-d88327d54233',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Metadata',
    example: { referenceId: '4bc67acd-8bb5-4d8f-8ea4-d88327d54233' },
  })
  metadata?: Record<string, unknown>;

  @Expose()
  @ApiProperty({
    description: 'Creation date of the association',
    example: '2023-12-01T00:00:00.000Z',
  })
  createdAt?: Date;
}
