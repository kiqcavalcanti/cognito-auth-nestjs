import { Provider } from '@nestjs/common';
import { RedisCacheService } from 'node-cognito-core-sdk';
import { ConfigService } from '@nestjs/config';

export const CognitoRedisCacheProvider: Provider = {
  provide: RedisCacheService,
  useFactory: (configService: ConfigService) => {
    return new RedisCacheService(
      configService.get('REDIS_COGNITO_HOST'),
      configService.get('REDIS_COGNITO_PORT'),
      configService.get('REDIS_COGNITO_PASSWORD'),
    );
  },
  inject: [ConfigService],
};
