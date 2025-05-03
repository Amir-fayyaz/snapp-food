import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SKIP_KEY } from 'src/common/decorators/skipAuth.decorator';
import { AdminTokenPaylod } from '../types/admin-TokenPaylod.type';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkippedAuth = this.reflector.get<Boolean>(
      SKIP_KEY,
      context.getHandler(),
    );

    if (isSkippedAuth) return true;
    return;
  }

  private extractToken(ctx: ExecutionContext): string {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    )
      throw new UnauthorizedException();

    return request.headers.authorization.split(' ')[1];
  }

  private validateToken(token: string) {
    try {
      const paylod: AdminTokenPaylod = this.JwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!paylod?.admin_id) throw new ForbiddenException();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
