import { CognitoAuthProvider } from './cognito-auth.provider';
import { CognitoGroupProvider } from './cognito-group.provider';
import { CognitoUserProvider } from './cognito-user.provider';

export const CognitoModuleProviders = [
  CognitoAuthProvider,
  CognitoGroupProvider,
  CognitoUserProvider,
];
