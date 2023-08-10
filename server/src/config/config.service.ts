import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
	config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать конфиг');
		} else {
			this.config = result.parsed as DotenvParseOutput;
			this.logger.log('[ConfigService] Конфигурация загружена');
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
