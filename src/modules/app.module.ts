import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/configs/typeorm.config';
import { InternalModules } from './global/internal-modules';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ...InternalModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
