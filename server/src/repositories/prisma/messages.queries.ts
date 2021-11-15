import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';

export class PrismaMessagesRepository implements MessageRepository {
	addMessage = async ({ messageID, fromuser, content, createdat }: Message) => {
		const main = async () =>
			await prisma.message.create({
				data: {
					messageID,
					fromuser,
					content,
					createdat: createdat.toString(),
				},
			});
		main()
			.catch((e: Error) => {
				log.error(`Prisma Message Repository add message error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
	};
	getAllMessages = async () => {
		const main = async () => await prisma.message.findMany();
		const messages = main()
			.catch((e: Error) => {
				log.error(`Prisma Message Repository add message error: ${e}`);
				throw e;
			})
			.finally(async () => {
				await prisma.$disconnect();
			});
		log.info(`results of getAllMessages: ${JSON.stringify(messages)}`);
		return messages;
	};
}
