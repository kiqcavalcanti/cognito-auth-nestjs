import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoModuleProviders } from '../providers';
import { CacheModule } from '@nestjs/cache-manager';
import { redisCacheConfig } from '../config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisCacheConfig(configService),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [...CognitoModuleProviders],
  exports: [...CognitoModuleProviders],
})
export class CognitoModule {}
