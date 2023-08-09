import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

// прототип для всех контроллеров
export abstract class BaseController {
	private readonly _router: Router;

	constructor(logger: LoggerService) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	// отправка сообщения
	public send<T>(res: Response, code: number, message: T) {
		res.type('application/json');
		return res.status(code).json(message);
	}

	// быстрая версия отправки
	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}

	// ответ реализован
	public created(res: Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes() {}
}
