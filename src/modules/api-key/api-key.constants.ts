export const API_KEY_JWT_STRATEGY_NAME =
  'gc-crm-nestjs-utils-api-key-jwt' as const;
export const API_KEY_AUTH_PROVIDER = 'API_KEY_AUTH_PROVIDER' as const;

export enum ApiKeyAuthProvider {
  PRODUCTION = 'https://whm.grainchain.io/api/v1/whm-loads/auth',
  STAGING = 'https://whm-staging.grainchain.io/api/v1/whm-loads/auth',
  DEVELOPMENT = 'https://whm-develop.grainchain.io/api/v1/whm-loads/auth',
}

export interface ApiKeyModuleOptions {
  isGlobal?: boolean;
  authProvider: ApiKeyAuthProvider | string;
}
