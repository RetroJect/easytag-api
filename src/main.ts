import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import config from './utils/config/AppConfig';
import logger from './utils/logger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
    }),
  });

  // Load the application configuration from a file
  try {
    await config.init();
  } catch {
    // File wasn't able to read and a default wasn't able to be written
    logger.fatal('Unable to initialize App Configuration!');
    process.exit(1);
  }
  logger.debug('App configuration initialized!');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
