import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// internal modules => user.module.ts , ...
// @Global() => for AppModule providers
// configs => typeOrmModule.forRoot() , staticServe.forRoot() , ...
