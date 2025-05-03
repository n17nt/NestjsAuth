import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  console.log(process.env.PORT);
  const builder = new DocumentBuilder()
    .setTitle('Courselar api')
    .addBearerAuth()
    .build();
  const factory = () => SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, factory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
