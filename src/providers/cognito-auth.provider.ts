import { Provider } from '@nestjs/common';
import { CognitoAuthService } from 'node-cognito-core-sdk';
import { ConfigService } from '@nestjs/config';

export const CognitoAuthProvider: Provider = {
  provide: CognitoAuthService,
  useFactory: (configService: ConfigService) => {
    return new CognitoAuthService(
      configService.get('AWS_COGNITO_USER_POOL_ID'),
      configService.get('AWS_DEFAULT_REGION'),
      {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      configService.get('AWS_COGNITO_HOST'),
      configService.get('AWS_COGNITO_IDP_URL'),
    );
  },
  inject: [ConfigService],
};
