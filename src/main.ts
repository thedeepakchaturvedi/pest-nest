import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { PestModule } from './Pest/modules/pest.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // pest usage
  const pestModuleInstance = app.get(PestModule);
  pestModuleInstance.attachToApp(app);

  await app.listen(3070);

  app.enableShutdownHooks();
}
bootstrap();
