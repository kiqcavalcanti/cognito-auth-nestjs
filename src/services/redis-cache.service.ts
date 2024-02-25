import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheServiceInterface } from 'node-cognito-core-sdk';

@Injectable()
export class RedisCacheService implements CacheServiceInterface {
  constructor(
    @Inject(CACHE_MANAGER)
    protected cacheService: Cache,
  ) {}

  async get(key: string): Promise<string | null> {
    return this.cacheService.get(key);
  }

  async set(key: string, value: unknown, ttlInMs?: number): Promise<void> {
    await this.cacheService.set(key, value, ttlInMs);
  }
}
