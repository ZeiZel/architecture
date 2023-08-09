import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUsersController } from './users/users.controller.interface';

interface IBootstrap {
	app: App;
	appContainer: Container;
}

export const appBindings: ContainerModule = new ContainerModule((bind: interfaces.Bind): void => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IUsersController>(TYPES.UserController).to(UserController);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): IBootstrap => {
	const appContainer: Container = new Container();

	appContainer.load(appBindings);

	const app: App = appContainer.get<App>(TYPES.Application);

	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
