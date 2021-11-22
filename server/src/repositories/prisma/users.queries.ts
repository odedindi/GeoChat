import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';
import { User as PrismaUserModel } from '@prisma/client';
import UserMap from './UserMap';
export class PrismaUserRepository implements UserRepository {
	private userMap = new UserMap();
	private handleError = async <T>(cb: Promise<T>, errMsg: string) =>
		cb.catch((e: Error) => {
			log.error(`${errMsg}: ${e}`);
			throw e;
		});

	public addUser = async (user: UserDTO): Promise<PrismaUserModel> => {
		const errMsg = 'Prisma User Repository add user error';
		return this.handleError<PrismaUserModel>(
			prisma.user.upsert({
				where: { userID: user.userID },
				update: {
					room: user.room,
					socketID: user.socketID,
				},
				create: { ...user },
			}),
			errMsg,
		);
	};
	public updateUser = async (user: UserDTO): Promise<PrismaUserModel> => {
		const errMsg = 'Prisma User Repository update user error';
		return this.handleError<PrismaUserModel>(
			prisma.user.update({
				where: { userID: user.userID },
				data: { ...user },
			}),
			errMsg,
		);
	};
	public removeUser = (userID: string): Promise<PrismaUserModel> => {
		const errMsg = 'Prisma User Repository remove user error';
		return this.handleError<PrismaUserModel>(
			prisma.user.delete({ where: { userID } }),
			errMsg,
		);
	};
	public getAllUsers = async () => {
		const errMsg = 'Prisma User Repository remove user error';
		const prismaUsers = await this.handleError<PrismaUserModel[]>(
			prisma.user.findMany(),
			errMsg,
		);

		const users: UserDTO[] = this.userMap.toDTOArr(prismaUsers);
		log.info(`getAllUsers, number of users found: ${users.length} `);
		return users;
	};

	public getUserBySocketID = async (socketID: string) => {
		const errMsg = 'Prisma User Repository get User By SocketID error';
		const prismaUser = await this.handleError(
			prisma.user.findUnique({
				where: { socketID },
			}),
			errMsg,
		);
		if (prismaUser) {
			const matchUser = this.userMap.toDTO(prismaUser);
			return [matchUser];
		} else return [] as UserDTO[];
	};

	public getUserByUserID = async (userID: string) => {
		const errMsg = 'Prisma User Repository get User By UserID error';
		const prismaUser = await this.handleError(
			prisma.user.findUnique({
				where: { userID },
			}),
			errMsg,
		);
		if (prismaUser) {
			const matchUser: UserDTO = this.userMap.toDTO(prismaUser);
			return [matchUser];
		} else return [] as UserDTO[];
	};
	public getUsersByRoom = async (room: string) => {
		const errMsg = 'Prisma User Repository get Users By room error';
		const prismaUsers = await this.handleError<PrismaUserModel[]>(
			prisma.user.findMany({
				where: { room },
			}),
			errMsg,
		);

		const users: UserDTO[] = this.userMap.toDTOArr(prismaUsers);
		log.info(`getUsersByRoom, number of users found: ${users.length} `);
		return users;
	};
}
