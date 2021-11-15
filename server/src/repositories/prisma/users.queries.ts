import { userInfo } from 'os';
import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';

export class PrismaUserRepository implements UserRepository {
	addUser = ({
		username,
		avatar,
		socketID,
		room,
		geo: { coord, preferedDistance },
		userID,
	}: User) => {
		const main = async () =>
			await prisma.user.upsert({
				where: {
					userID,
				},
				update: {
					socketID,
					room,
					geolocation_lat: coord.lat.toString(),
					geolocation_lng: coord.lng.toString(),
				},
				create: {
					username,
					avatar,
					socketID,
					room,
					userID,
					preferedDistance,
					geolocation_lat: coord.lat.toString(),
					geolocation_lng: coord.lng.toString(),
				},
			});
		main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository add user error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
	};
	updateUser = ({ username, avatar, socketID, room, geo, userID }: User) => {
		const { coord, preferedDistance } = geo;
		const main = async () =>
			await prisma.user.update({
				where: { userID },
				data: {
					username,
					avatar,
					socketID,
					room,
					userID,
					preferedDistance,
					geolocation_lat: coord.lat.toString(),
					geolocation_lng: coord.lng.toString(),
				},
			});
		main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository update user error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
	};
	removeUser = (userID: string) => {
		const main = async () =>
			await prisma.user.delete({
				where: { userID },
			});
		main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository remove user error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
	};
	getAllUsers = async () => {
		const main = async () =>
			(await prisma.user.findMany({
				include: { messages: true },
			})) as User[];

		const users = main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository remove user error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
		log.info(`getAllUsers, number of users found: ${(await users).length} `);
		return users;
	};
	getUserBySocketID = async (socketID: string) => {
		const main = async () =>
			(await prisma.user.findUnique({
				where: { socketID },
				include: { messages: true },
			})) as User;
		const match = await main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository get User By SocketID error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});

		return [match];
	};
	getUserByUserID = async (userID: string) => {
		const main = async () =>
			(await prisma.user.findUnique({
				where: { userID },
				include: { messages: true },
			})) as User;
		const match = await main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository get User By UserID error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});

		return [match];
	};
	getUsersByRoom = async (room: string) => {
		const main = async () =>
			await prisma.user.findMany({
				where: { room },
				include: { messages: true },
			});
		const match = await main()
			.catch((e: Error) => {
				log.error(`Prisma User Repository get Users By room error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});

		return match;
	};
}
