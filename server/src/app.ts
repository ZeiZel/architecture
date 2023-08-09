import express, { Express } from 'express';
import { Server } from 'http';
import { usersRouter } from './users/users';
import { LoggerService } from './logger/logger.service';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.app = express();
		this.port = 8000;
		this.server = new Server();
		this.logger = logger;
	}

	useRoutes(): void {
		this.app.use('/users', usersRouter);
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
