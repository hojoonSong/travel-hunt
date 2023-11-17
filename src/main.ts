import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

  const validationPipeOptions = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  };

  const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The Example API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .useGlobalFilters(new HttpExceptionFilter(new Logger()))
    .enableCors(corsOptions);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
