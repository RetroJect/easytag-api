import Config from './Config';
import PluginConfig from './PluginConfig';
import logger from '../logger';

interface config {
  libraries: string[];
}

interface pluginConfig {
  [key: string]: any;
}

class AppConfig extends Config<config> {
  plugins: {
    [key: string]: PluginConfig<pluginConfig>;
  };

  constructor() {
    super('EasyTag');
    this.config = {
      libraries: [],
    };
  }

  async init(): Promise<config> {
    try {
      // Try to read the config file
      await this.readConfig();
    } catch {
      logger.warn('Unable to read App Configuration');

      // Write a new config if one wasn't found
      await this.writeConfig();

      logger.log('Created a new app configuration because one was not found');
    }

    return this.config;
  }

  // TODO
  registerPlugin() {}
}

export default new AppConfig();
