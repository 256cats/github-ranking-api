import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import promBundle from 'express-prom-bundle';
import { promMiddleware } from './common/prom';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));

  const httpAdapter = app.getHttpAdapter();
  const instance = httpAdapter.getInstance();

  instance.set('trust proxy', 1);
  instance.disable('x-powered-by');
  app.use(promMiddleware);
  app.use('/metrics', promMiddleware.metricsMiddleware);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const logger = new Logger('main');

  const config = new DocumentBuilder()
    .setTitle('Github ranking api')
    .setDescription('API provides the top Github repositories by date')
    .setVersion('1.0')
    .addTag('github-ranking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.SRV_PORT || 3000;
  await app.listen(port).then(() => {
    logger.log(`Listening on port: ${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
