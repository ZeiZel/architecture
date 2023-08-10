import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(
				// тут получаем Bearer
				req.headers.authorization.split(' ')[1],
				this.secret,
				(error, payload: { email: string }) => {
					if (error) {
						next();
					} else {
						req.user = payload.email;
						next();
					}
				},
			);
		} else {
			next();
		}
	}
}
