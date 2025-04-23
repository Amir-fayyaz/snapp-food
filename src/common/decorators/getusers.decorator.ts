import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    if (data === 'user') {
      return context.switchToHttp().getRequest().user;
    }

    if (data === 'admin') {
      return context.switchToHttp().getRequest().admin;
    }

    if (data === 'supplier') {
      return context.switchToHttp().getRequest().supplier;
    }
  },
);
