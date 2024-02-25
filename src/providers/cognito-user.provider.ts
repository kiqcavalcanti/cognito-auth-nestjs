import { Provider } from '@nestjs/common';
import { CognitoUserService } from 'node-cognito-core-sdk';
import { ConfigService } from '@nestjs/config';

export const CognitoUserProvider: Provider = {
  provide: CognitoUserService,
  useFactory: (configService: ConfigService) => {
    return new CognitoUserService(
      configService.get('AWS_COGNITO_USER_POOL_ID'),
      configService.get('AWS_DEFAULT_REGION'),
      {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      configService.get('COMERC_AUTH_API_URL'),
    );
  },
  inject: [ConfigService],
};
