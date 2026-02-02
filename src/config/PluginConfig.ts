import { INestApplication, Logger } from '@nestjs/common';
import Config from './Config';

abstract class PluginConfig<T> extends Config<T> {
  abstract register(app: INestApplication, logger: Logger): Promise<void>;
}

export default PluginConfig;
