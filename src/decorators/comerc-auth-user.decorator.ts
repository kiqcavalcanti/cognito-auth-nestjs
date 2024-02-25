import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenInfoOutput } from 'node-cognito-core-sdk';

export const TokenInfo = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request['comercAuth'] as TokenInfoOutput | undefined;
  },
);
