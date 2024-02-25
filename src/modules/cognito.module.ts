import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoModuleProviders } from '../providers';
import { CacheModule } from '@nestjs/cache-manager';
import { redisCacheConfig } from '../config';
import { RedisCacheService } from '../services/redis-cache.service';

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
  providers: [...CognitoModuleProviders, RedisCacheService],
  exports: [...CognitoModuleProviders],
})
export class CognitoModule {}
