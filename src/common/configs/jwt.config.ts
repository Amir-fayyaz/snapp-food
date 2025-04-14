import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

// import { config } from 'dotenv';

// config();

// export const Jwtconfig: JwtModuleAsyncOptions = {
//   useFactory: () => ({
//     secret: process.env.JWT_SECRET,

//     signOptions: { expiresIn: process.env.JWT_EXPIRE },
//   }),
// };

export const Jwtconfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRE'),
    },
  }),
  inject: [ConfigService],
};
