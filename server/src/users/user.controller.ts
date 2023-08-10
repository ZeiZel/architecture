import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { USER_ALREADY_EXISTS } from './user.constants';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) logger: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(logger);

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);

		if (!result) return next(new HTTPError(401, 'Ошибка авторизации', 'login'));

		this.ok(res, {});
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) return next(new HTTPError(401, USER_ALREADY_EXISTS));

		this.ok(res, result);
	}
}
