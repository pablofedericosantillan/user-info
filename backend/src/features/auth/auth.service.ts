import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateService, UserGetService } from '../users/services';

interface GoogleProfile {
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userGetService: UserGetService,
    private readonly userCreateService: UserCreateService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreate(
    profile: GoogleProfile,
  ): Promise<{ id: string; email: string }> {
    const existing = await this.userGetService.findByEmail(profile.email);
    if (existing) return { id: existing.id, email: existing.email };

    const created = await this.userCreateService.create({
      email: profile.email,
      pwd: '',
      metadata: { name: profile.name },
      deletedAt: undefined,
    });
    return { id: created.id, email: profile.email };
  }

  generateJwt(userId: string, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }
}
