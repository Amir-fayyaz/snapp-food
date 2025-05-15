import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';

@Injectable()
export class WsRoleGuard implements CanActivate {
  constructor(private readonly Reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRole: string = context.switchToWs().getClient<Socket>().user.role;
    const requiredRoles: string[] = this.Reflector.get(
      ROLE_KEY,
      context.getHandler(),
    );

    return requiredRoles.includes(userRole);
  }
}
