import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AppConfigService } from 'src/common/app-config';
import { AuthService } from 'src/features/auth/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: AppConfigService,
  ) {}

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirect to Google OAuth' })
  googleLogin() {
    // First, the user initiates the authentication flow by calling this endpoint.
    // The request is then handled by the GoogleStrategy, which redirects the user
    // to Google's authentication provider.
    // After successful authentication, Google redirects the user back to the callback endpoint.
    // In the callback, we validate the user information and generate an application token (JWT)
    // that will be used to authenticate subsequent requests.
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  googleCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user as { id: string; email: string };

    // Generate Jwt token
    const token = this.authService.generateJwt(user.id, user.email);

    const { FRONTEND_URL } = this.config.getConfig();

    console.log('Google/callback - token -> ', token);

    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  }
}
