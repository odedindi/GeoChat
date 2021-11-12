import { PrismaClient } from '@prisma/client';
import log from 'src/config/logger';

export const prisma = new PrismaClient();

export const main = async () => {
	// ... you will write your Prisma Client queries here
	const users = await prisma.user.findMany();
	console.log(users);
};

// main()
// 	.catch((e) => {
//         log.error(`prisma.controller main() Error:  ${e}`)
// 		throw e;
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});
