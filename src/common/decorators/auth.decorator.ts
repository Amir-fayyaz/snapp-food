import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SupplierGuard } from 'src/modules/auth/guards/supplier.guard';

export function UserAuth() {
  return applyDecorators(ApiBearerAuth('Authorizaion'), UseGuards());
}

export function SupplierAuth() {
  return applyDecorators(
    ApiBearerAuth('Authorizaion'),
    UseGuards(SupplierGuard),
  );
}
