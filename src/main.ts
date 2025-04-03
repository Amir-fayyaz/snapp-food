import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { InitializeSwagger } from './common/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  InitializeSwagger(app);
  const { PORT = 3000 } = process.env;
  await app.listen(PORT, () => {
    console.log(`swagger run on http://localhost:${PORT}/docs`);
  });
}
bootstrap();

// internal modules => user.module.ts , ...
// @Global() => for AppModule providers
// configs => typeOrmModule.forRoot() , staticServe.forRoot() , ...
