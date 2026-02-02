import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import sanitize from 'sanitize-filename';
import { ReadConfigError, WriteConfigError } from './Errors';
import log from '../utils/logger';

const configDir = resolve(process.env.CONFIG_DIR ?? './config');

export interface ConfigFileProperties {
  path: string;
  name: string;
  fileName: string;
}

export default class Config<T> implements ConfigFileProperties {
  readonly path: string;
  readonly name: string;
  readonly fileName: string;

  config: T;

  constructor(name: string, path?: string) {
    this.name = name;
    this.fileName = sanitize(name).concat('.json');
    this.path = join(path ?? configDir, this.fileName);
  }

  /**
   * Overwrites the current config properties with those defined in the config file
   */
  async readConfig(): Promise<T> {
    try {
      const file = await readFile(this.path);
      // Coerce the JSON representation into our config type
      this.config = JSON.parse(file.toString()) as T;

      log.debug(`Configuration ${this.name} read!`);

      return this.config;
    } catch (error) {
      log.warn(
        `Unable to read configuration file '${this.path}': ${error}`,
        `Config:${this.name}`,
      );

      throw new ReadConfigError(this);
    }
  }

  /**
   * Writes the current config properties to the config file
   */
  async writeConfig() {
    try {
      // Make the config directory if not present
      await mkdir(dirname(this.path), { recursive: true });
      // Write the config file
      await writeFile(this.path, JSON.stringify(this.config, null, 2));

      log.debug(`Configuration ${this.name} written!`);
    } catch (error) {
      log.error(
        `Unable to write configuration file '${this.path}': ${error}`,
        `Config:${this.name}`,
      );

      throw new WriteConfigError(this);
    }
  }
}
