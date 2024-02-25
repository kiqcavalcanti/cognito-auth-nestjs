import {
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Scope } from '../decorators';
import { TokenInfoOutput } from 'node-cognito-core-sdk';
@Injectable()
export class HasCognitoScopeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest()[
      'comercAuth'
    ] as TokenInfoOutput;

    const scope = this.reflector.get(Scope, context.getHandler());

    if (!scope) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const hasScope =
      user.scope.split(' ').filter((userScope) => userScope === scope).length >
      0;

    if (!hasScope) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
