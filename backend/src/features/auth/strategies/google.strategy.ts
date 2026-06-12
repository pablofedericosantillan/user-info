import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AppConfigService } from 'src/common/app-config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: AppConfigService,
    private readonly authService: AuthService,
  ) {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } =
      config.getConfig();
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  // Passport calls this method after Google successfully authenticates the user.
  // Here we extract the required profile information and map it to our application user.
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log('Info from google->', profile);

    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;
    const user = await this.authService.findOrCreate({ email, name });
    done(null, user);
  }
}
