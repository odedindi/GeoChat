import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';
export const main = '';

export class PrismaUserRepository implements UserRepository {
	private main = (cb: any) =>
		cb()
			.catch((e: any) => console.error(e))
			.finally(async () => await prisma.$disconnect());

	addUser = async ({
		username,
		avatar,
		socketID,
		room,
		geo: { coord, preferedDistance },
		userID,
	}: User) => {
		const geolocation = `(${coord.lat}, ${coord.lng})`;
		return async () =>
			this.main(
				await prisma.user.create({
					data: {
						username,
						avatar,
						socketID,
						room,
						userID,
						preferedDistance,
						geolocation,
					},
				}),
			);
	};
	updateUser: (user: User) => void;
	removeUser: (userID: string) => void;
	getAllUsers = async () => {
		const users = this.main(
			await prisma.user.findMany({ include: { messages: true } }),
		);

		log.info(`getAllUsers, number of users found: ${users} `);
		return users as User[];
	};
	getUserBySocketID: (socketID: string) => Promise<User[]>;
	getUserByUserID: (userID: string) => Promise<User[]>;
	getUsersByRoom: (room: string) => Promise<User[]>;
}
