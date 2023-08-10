import { IPrismaService } from './prisma.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaService implements IPrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Совершено успешное подключение от базы данных');
		} catch (e: unknown) {
			if (e instanceof Error) {
				this.logger.error(
					`[PrismaService] Не удалось подключиться к базе данных ${e.message}`,
				);
			}
		}
	}

	async disconnect(): Promise<void> {
		this.logger.log('[PrismaService] Совершено отключение от базы данных');
	}
}
