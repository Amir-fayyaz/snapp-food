import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

export const getUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);

export const getSocketClient = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return context.switchToWs().getClient<Socket>().user;
  },
);
