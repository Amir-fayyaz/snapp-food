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
import { Observable } from 'rxjs';
import { SKIP_KEY } from 'src/common/decorators/skipAuth.decorator';
import { UserAppService } from 'src/modules/users/client/user.client.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly UserService: UserAppService,
    private readonly JwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSkippedAuth = this.reflector.get<Boolean>(
      SKIP_KEY,
      context.getHandler(),
    );

    if (isSkippedAuth) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = await this.validateToken(this.extractToken(request));

    request.user = {
      role: 'user',
      mobile: user.mobile,
      user_id: user.id,
    };

    return true;
  }

  private extractToken(request: Request): string {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    )
      throw new UnauthorizedException('Invalid token');

    return request.headers.authorization.split(' ')[1];
  }

  private async validateToken(token: string) {
    try {
      const paylod = await this.JwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!paylod?.user_id) throw new ForbiddenException();

      const user = await this.UserService.getUserById(paylod.user_id);

      if (!user) throw new UnauthorizedException('please login again !');

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
