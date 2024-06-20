import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiKeyJwtAuthGuard } from '../guard/api-key-jwt-auth.guard';

export const UseApiKeyGuard = () =>
  applyDecorators(UseGuards(ApiKeyJwtAuthGuard));
