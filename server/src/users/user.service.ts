import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { UserModel } from '@prisma/client';
import { IUserRepository } from './user.repository.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ username, email, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser: User = new User(email, username);
		const salt: string = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		const existedUser = await this.userRepository.find(email);
		if (existedUser) return null;

		return this.userRepository.create(newUser);
	}

	async validateUser({ password, email }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);

		if (!existedUser) return false;

		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);

		return newUser.comparePassword(password);
	}

	getUserInfo(email: string): Promise<UserModel | null> {
		return this.userRepository.find(email);
	}
}
