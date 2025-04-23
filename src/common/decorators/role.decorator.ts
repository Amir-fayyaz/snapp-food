import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';

export const Role = (roles: ('user' | 'supplier' | 'admin')[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
