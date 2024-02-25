import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoModuleProviders } from '../providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [...CognitoModuleProviders],
  exports: [...CognitoModuleProviders],
})
export class CognitoModule {}
