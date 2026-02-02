import { ConsoleLogger } from '@nestjs/common';

const appLogger = new ConsoleLogger('EasyTag', { timestamp: true, json: true });

export default appLogger;
