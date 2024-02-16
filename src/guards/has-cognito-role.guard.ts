import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenInfoOutput } from 'node-cognito-core-sdk';

@Injectable()
export class HasCognitoRoleGuard implements CanActivate {
  constructor(protected configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request['comercAuth'] as TokenInfoOutput;

    const hasRole = user.groups.includes(
      this.configService.get('AWS_COGNITO_ROLE'),
    );

    if (!hasRole) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
