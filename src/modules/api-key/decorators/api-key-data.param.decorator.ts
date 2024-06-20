import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiKey } from '../interface/api-key';

type ApiKeyRequest = Request & {
  user?: ApiKey;
};

/**
 * Parameter decorator that works with the ApiKey guard to use the
 * api key data stored in DB.
 *
 * You must use the ApiKey guard in order for this property to work.
 * @returns {ApiKey} - The loaded api key data.
 * @example
 * @UseApiKeyGuard()
 * async update(@ApiKeyData() apiKey: ApiKey) { }
 *
 */
export const ApiKeyData = createParamDecorator(
  (_, ctx: ExecutionContext): ApiKey => {
    const { user } = ctx.switchToHttp().getRequest() as ApiKeyRequest;

    if (user?.client_id && user?.organization_ids) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  },
);
