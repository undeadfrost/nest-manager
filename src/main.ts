import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('nest-manager')
    .setDescription('The nest-manager API description')
    .setVersion('1.0')
    .addTag('nest-manager')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}

bootstrap();
