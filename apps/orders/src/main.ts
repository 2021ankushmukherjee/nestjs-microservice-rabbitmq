/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { OrdersModule } from './orders.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let httpsOptions = undefined;
  // if(process.env.ENABLE_TLS === "true") {
  //   console.log("Applying TLS SSL")
  //   const fs = require('fs')
  //   const path = require('path')
  //   const sslCertDir = process.env.SSL_CERT_DIR
  //   httpsOptions = {
  //     key: fs.readFileSync(path.join(sslCertDir, 'server.key')),
  //     cert: fs.readFileSync(path.join(sslCertDir, 'server.crt')),
  //   }
  // }
  const app = await NestFactory.create<NestExpressApplication>(OrdersModule, {
    httpsOptions,
    snapshot: true
  });
  // const globalPreset = process.env.GLOBAL_PRESET || ""
  app.use(express.json({ limit: '10mb' }));
  // app.setGlobalPrefix(globalPreset)
  // app.enableCors({
  //   origin: [
  //  
  //   ],
  //   credentials: true,
  // })

  const config = new DocumentBuilder()
    .setTitle('Orders')
    .setDescription('Orders API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/orders/swagger`, app, document);


  const port = process.env.NODE_PORT || 3001
  await app.listen(port,
    () => console.log("Listening to port", port)
  );

}

bootstrap();
