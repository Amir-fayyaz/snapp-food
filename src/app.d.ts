import { ISupplier, IUser } from './common/types/request-user.types';
import { UserEntity } from './modules/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      supplier?: any;
      admin: any;
    }
  }
}

import { Socket } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    user?: IUser;
  }
}
