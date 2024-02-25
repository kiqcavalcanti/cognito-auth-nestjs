import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoModuleProviders } from '../providers';
import { RedisCacheService } from '../services/redis-cache.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [...CognitoModuleProviders, RedisCacheService],
  exports: [...CognitoModuleProviders],
})
export class CognitoModule {}
