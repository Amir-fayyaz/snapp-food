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
