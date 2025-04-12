import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const Jwtconfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRE },
};
