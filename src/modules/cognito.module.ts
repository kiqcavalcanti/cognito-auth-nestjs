import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoProviders } from '../providers';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...CognitoProviders],
  exports: [...CognitoProviders],
})
export class CognitoModule {}
