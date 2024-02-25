import { Reflector } from '@nestjs/core';

export const TokenType = Reflector.createDecorator<'ALL' | 'ACCESS' | 'ID'>();
