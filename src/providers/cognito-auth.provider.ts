import { Provider } from '@nestjs/common';
import { CognitoAuthService, RedisCacheService } from 'node-cognito-core-sdk';
import { ConfigService } from '@nestjs/config';

export const CognitoAuthProvider: Provider = {
  provide: CognitoAuthService,
  useFactory: (
    configService: ConfigService,
    redisCacheService: RedisCacheService,
  ) => {
    return new CognitoAuthService(
      configService.get('AWS_COGNITO_USER_POOL_ID'),
      configService.get('AWS_DEFAULT_REGION'),
      {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      configService.get('AWS_COGNITO_HOST'),
      configService.get('AWS_COGNITO_IDP_URL'),
      configService.get('COMERC_AUTH_API_URL'),
      redisCacheService,
    );
  },
  inject: [ConfigService, RedisCacheService],
};
