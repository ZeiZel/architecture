import { IUserRepository } from './user.repository.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, name, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({ data: { email, name, password } });
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
