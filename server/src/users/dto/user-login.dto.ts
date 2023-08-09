import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsString({ message: 'Не указан пароль' })
	password: string;

	@IsEmail({}, { message: 'почта указана неверно' })
	email: string;
}
