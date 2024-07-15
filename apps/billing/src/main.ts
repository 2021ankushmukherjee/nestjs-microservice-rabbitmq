/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { BillingModule } from './billing.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BillingModule);
  
  app.use(express.json({ limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('Billing')
    .setDescription('Billing API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/billing/swagger`, app, document);


  const port = process.env.NODE_PORT || 3002
  await app.listen(port,
    () => console.log("Listening to port", port)
  );

}

bootstrap();
