import { CognitoAuthProvider } from './cognito-auth.provider';
import { CognitoGroupProvider } from './cognito-group.provider';
import { CognitoUserProvider } from './cognito-user.provider';
import { CognitoRedisCacheProvider } from './cognito-redis-cache.provider';

export const CognitoModuleProviders = [
  CognitoRedisCacheProvider,
  CognitoAuthProvider,
  CognitoGroupProvider,
  CognitoUserProvider,
];
