import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Tienda en Linea Hilde')
    .setDescription('Documentación tienda en linea Hilde')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // URL API
  SwaggerModule.setup('docs', app, document);
  await app.listen(3001);
}

bootstrap();
