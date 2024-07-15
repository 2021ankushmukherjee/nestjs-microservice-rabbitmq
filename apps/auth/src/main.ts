import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  
  const config = new DocumentBuilder()
  .setTitle('Auth')
  .setDescription('Auth APi Description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/auth/swagger`, app, document);

  const port = process.env.NODE_PORT || 3003
  await app.listen(port,
    () => console.log("Listening to port", port)
  );
}
bootstrap();
