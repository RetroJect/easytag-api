import { ConfigFileProperties } from './Config';

export class ReadConfigError extends Error {
  constructor(config: ConfigFileProperties) {
    super(`Unable to read configuration file '${config.path}`);
    this.name = 'ReadConfigError';
  }
}

export class WriteConfigError extends Error {
  constructor(config: ConfigFileProperties) {
    super(`Unable to write configuration file '${config.path}`);
    this.name = 'WriteConfigError';
  }
}
