import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
	app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.HTTP_PORT || 8020,'0.0.0.0');
}

bootstrap();
