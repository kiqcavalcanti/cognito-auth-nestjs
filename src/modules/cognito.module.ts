import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoModuleProviders } from '../providers';
import { CacheModule } from '@nestjs/cache-manager';
import { redisCacheConfig } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        redisCacheConfig(configService),
    }),
  ],
  providers: [...CognitoModuleProviders],
  exports: [...CognitoModuleProviders],
})
export class CognitoModule {}
