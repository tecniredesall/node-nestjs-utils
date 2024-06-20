import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { API_KEY_JWT_STRATEGY_NAME } from '../api-key.constants';

@Injectable()
export class ApiKeyJwtAuthGuard extends AuthGuard(API_KEY_JWT_STRATEGY_NAME) {}
