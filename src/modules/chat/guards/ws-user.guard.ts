import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SKIP_KEY } from 'src/common/decorators/skipAuth.decorator';
import { UserAppService } from 'src/modules/users/client/user.client.service';

@Injectable()
export class WsUserGuard implements CanActivate {
  constructor(
    private readonly Reflector: Reflector,
    private readonly UserService: UserAppService,
    private readonly JwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.CheckPublic(context);

    const socket = context.switchToWs().getClient<Socket>();

    const user = await this.ValidateToken(this.ExtractToken(socket));

    socket.user = {
      role: 'user',
      user_id: user.id,
      mobile: user.mobile,
    };
    return true;
  }

  private ExtractToken(socket: Socket): string {
    const token: string = socket.handshake.headers.authorization;

    if (!token || !token.startsWith('Bearer'))
      throw new WsException('Invalid token');

    return token.split(' ')[1];
  }

  private async ValidateToken(token: string) {
    const { JWT_SECRET } = process.env;

    try {
      const { user_id } = await this.JwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      const user = await this.UserService.getUserById(user_id);

      if (!user) throw new WsException('Unauthorized , not found user');

      return user;
    } catch (e) {
      throw new WsException(e.message);
    }
  }

  private CheckPublic(context: ExecutionContext) {
    const isSkippedAuth = this.Reflector.get<Boolean>(
      SKIP_KEY,
      context.getHandler(),
    );

    if (isSkippedAuth) return true;
  }
}
