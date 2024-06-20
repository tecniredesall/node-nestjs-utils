import { Controller, Get } from '@nestjs/common';
import { ApiKeyData } from '../../../src/modules/api-key/decorators/api-key-data.param.decorator';
import { UseApiKeyGuard } from '../../../src/modules/api-key/decorators/use-api-key-guard.decorator';
import { ApiKey } from '../../../src/modules/api-key/interface/api-key';

@Controller('api-key')
export class ApiKeyExampleController {
  @Get()
  @UseApiKeyGuard()
  async protectedEndpoint(@ApiKeyData() apiKey: ApiKey) {
    return {
      protected: true,
      organization_id: apiKey.organization_id,
      name: apiKey.name,
    };
  }
}
