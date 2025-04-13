import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const Jwtconfig: JwtModuleAsyncOptions = {
  useFactory: () => ({
    secret: process.env.JWT_SECRET,

    signOptions: { expiresIn: process.env.JWT_EXPIRE },
  }),
};
