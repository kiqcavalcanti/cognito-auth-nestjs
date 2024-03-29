import {
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators';
import { TokenInfoOutput } from 'node-cognito-core-sdk';

@Injectable()
export class HasCognitoRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    protected configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest()[
      'comercAuth'
    ] as TokenInfoOutput;

    const role =
      this.reflector.get(Role, context.getHandler()) ??
      this.configService.get('AWS_COGNITO_ROLE');

    if (!role) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const hasRole =
      user.groups.filter((userRole) => userRole === role).length > 0;

    if (!hasRole) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
