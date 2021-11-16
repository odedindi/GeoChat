import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';
import { Message as PrismaMessageModel } from '@prisma/client';

export class PrismaMessagesRepository implements MessageRepository {
	private handleError = async <T>(cb: Promise<T>, errMsg: string) =>
		cb.catch((e: Error) => {
			log.error(`${errMsg}: ${e}`);
			throw e;
		});

	public addMessage = async (message: MessageDTO) => {
		const errMsg = 'Prisma Message Repository add message error:';
		return this.handleError<PrismaMessageModel>(
			prisma.message.create({ data: { ...message } }),
			errMsg,
		);
	};
	public getAllMessages = async () => {
		const errMsg = 'Prisma Message Repository add message error:';

		const messages = await this.handleError<PrismaMessageModel[]>(
			prisma.message.findMany(),
			errMsg,
		);
		log.info(`results of getAllMessages: ${JSON.stringify(messages)}`);
		return messages;
	};
}
