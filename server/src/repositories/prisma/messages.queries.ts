import log from 'src/config/logger';
import prisma from 'src/config/prisma.config';
import { Message as PrismaMessageModel, Prisma } from '@prisma/client';

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
		log.info(`getAllMessages, number of messages found: ${messages.length}`);
		return messages;
	};

	public getMessagesWithinRange = async (
		lat: number,
		lng: number,
		radius: number,
	) => {
		const errMsg =
			'Prisma Message Repository find messages within range error:';

		const query = Prisma.sql`
			SELECT
				*
			FROM
				"Message"
			WHERE
				ST_DWithin(ST_MakePoint(geolocation_lat,geolocation_lng), ST_MakePoint(${lat}, ${lng})::geography, ${radius} * 1000)
		`;

		const messages = await this.handleError<PrismaMessageModel[]>(
			prisma.$queryRaw(query),
			errMsg,
		);

		log.info(
			`getMessagesWithinRange: number of messages found: ${messages.length}`,
		);
		return messages;
	};
}
