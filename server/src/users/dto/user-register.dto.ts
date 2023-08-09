import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Не указано имя пользователя' })
	username: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;

	@IsEmail({}, { message: 'почта указана неверно' })
	email: string;
}
