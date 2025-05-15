import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { SupplierGuard } from 'src/modules/auth/guards/supplier.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserGuard } from 'src/modules/auth/guards/user.guard';
import { WsUserGuard } from 'src/modules/chat/guards/ws-user.guard';
import { WsRoleGuard } from '../guards/ws-role.guard';

export function UserAuth() {
  return applyDecorators(
    ApiBearerAuth('Authorizaion'),
    ApiHeader({ name: 'Authorization', required: true }),
    UseGuards(UserGuard, RoleGuard),
  );
}

export function SupplierAuth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({ name: 'Authorization', required: true }),
    UseGuards(SupplierGuard, RoleGuard),
  );
}

export function WsUserAuth() {
  return applyDecorators(
    ApiBearerAuth('Authorizaion'),
    ApiHeader({ name: 'Authorization', required: true }),
    UseGuards(WsUserGuard, WsRoleGuard),
  );
}
