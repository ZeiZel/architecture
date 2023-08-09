import { IExceptionFilter } from './exception.filter.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	logger: ILogger;

	constructor(@inject(TYPES.ILogger) logger: ILogger) {
		this.logger = logger;
	}

	catch(err: Error, req: Request, res: Response, next: NextFunction): void {
		// если прилетевшая ошибка - это наша ошибка HTTP
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			// если произошла любая другая ошибка в приложении, то у нас выведется следующая ошибка
			this.logger.error(err.message);
			res.status(500).send({ err: err.message });
		}
	}
}
