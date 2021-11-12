import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';

export class PrismaMessagesRepository implements MessageRepository {
	addMessage = async ({ messageID, fromuser, content, createdat }: Message) => {
		const response = (await prisma.$queryRaw`
        insert into "Message" ("messageID", "fromuser", "content", "createdat")
        values (${messageID}, (${fromuser}, (${content}, (${createdat}, ) returning id`) as any;
		log.info(`Message: ${messageID} added to messages table`);
		console.log(
			'PrismaMessagesRepository addMessage response: ',
			JSON.stringify(response),
		);
	};
	getAllMessages = async () => {
		const messages = await prisma.message.findMany();
		log.info(`results of getAllMessages: ${JSON.stringify(messages)}`);
		return messages;
	};
}
