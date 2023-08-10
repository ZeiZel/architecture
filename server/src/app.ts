import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { json } from 'body-parser';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	logger: ILogger;
	userController: UserController;
	exceptionFilter: ExceptionFilter;
	configService: ConfigService;
	prismaService: PrismaService;

	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.UserController) userController: UserController,
		@inject(TYPES.ExceptionFilter) exceptionFilter: ExceptionFilter,
		@inject(TYPES.ConfigService) configService: ConfigService,
		@inject(TYPES.PrismaService) prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exceptionFilter = exceptionFilter;
		this.configService = configService;
		this.prismaService = prismaService;
	}

	useMiddleware() {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
