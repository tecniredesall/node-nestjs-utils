import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  API_KEY_AUTH_PROVIDER,
  API_KEY_JWT_STRATEGY_NAME,
} from '../api-key.constants';
import { ApiKey } from '../interface';

@Injectable()
export class ApiKeyJwtStrategy extends PassportStrategy(
  Strategy,
  API_KEY_JWT_STRATEGY_NAME,
) {
  constructor(
    @Inject(API_KEY_AUTH_PROVIDER)
    authProvider: string,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authProvider}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    });
  }

  validate(payload: ApiKey): ApiKey {
    return payload;
  }
}
