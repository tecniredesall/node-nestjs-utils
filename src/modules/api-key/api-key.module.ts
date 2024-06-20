import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  ApiKeyModuleOptions,
  API_KEY_AUTH_PROVIDER,
} from './api-key.constants';
import { ApiKeyJwtAuthGuard } from './guard';
import { ApiKeyJwtStrategy } from './strategy';

@Module({})
export class ApiKeyModule {
  static register(options: ApiKeyModuleOptions): DynamicModule {
    return {
      global: !!options.isGlobal,
      module: ApiKeyModule,
      imports: [PassportModule],
      providers: [
        ApiKeyJwtAuthGuard,
        ApiKeyJwtStrategy,
        {
          provide: API_KEY_AUTH_PROVIDER,
          useValue: options.authProvider,
        },
      ],
    };
  }
}
