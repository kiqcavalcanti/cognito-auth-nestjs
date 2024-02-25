import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CognitoAuthService,
  ExpiredTokenError,
  InvalidTokenError,
} from 'node-cognito-core-sdk';
import { Reflector } from '@nestjs/core';
import { TokenType } from '../decorators';

@Injectable()
export class ValidateTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    protected cognitoAuthService: CognitoAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      let token = null;

      if (request.headers.authorization) {
        token = request.headers.authorization.replace('Bearer ', '');
      }

      if (!token) {
        throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
      }

      const comercUser = await this.cognitoAuthService.tokenInfo(token);

      request['comercAuth'] = comercUser;

      const tokenType =
        this.reflector.get(TokenType, context.getHandler()) ?? 'ALL';

      if (
        tokenType.toUpperCase() !== 'ALL' &&
        comercUser.tokenUse !== tokenType.toUpperCase()
      ) {
        throw new HttpException(
          `Token type is invalid. the token type must be ${tokenType}`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      return true;
    } catch (error) {
      if (
        error instanceof ExpiredTokenError ||
        error instanceof InvalidTokenError
      ) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }

      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
