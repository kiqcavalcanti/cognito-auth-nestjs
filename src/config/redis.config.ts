import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const redisCacheConfig = async (
  configService: ConfigService,
): Promise<any> => {
  return {
    store: await redisStore({
      socket: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
      password: configService.get('REDIS_PASSWORD'),
    }),
  };
};
