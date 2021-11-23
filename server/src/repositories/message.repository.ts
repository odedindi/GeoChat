import { Injectable } from '@nestjs/common';
import prisma from '../config/prisma.config';
import { Message as PrismaMessage, Prisma } from '@prisma/client';
import MessageMap from '../utils/Mappers/MessageMap';
import log from '../config/logger';

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  private messageMap = new MessageMap();
  private handleError = async <T>(cb: Promise<T>, errMsg: string): Promise<T> =>
    cb.catch((e: Error) => {
      log.error(`${errMsg}: ${e}`);
      throw e;
    });

  public addMessage = async (data: Prisma.MessageCreateInput) => {
    const errMsg = 'Prisma Message Repository add message error:';
    const prismaMessage = await this.handleError(
      prisma.message.create({ data }),
      errMsg,
    );
    return this.messageMap.toDTO(prismaMessage);
  };

  public removeMessage = async (where: Prisma.MessageWhereUniqueInput) => {
    const errMsg = 'Prisma Message Repository removeMessage error';
    const prismaMessage = await this.handleError(
      prisma.message.delete({ where }),
      errMsg,
    );
    return this.messageMap.toDTO(prismaMessage);
  };

  public getAllMessages = async ({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MessageWhereUniqueInput;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput;
  }) => {
    const errMsg = 'Prisma Message Repository add message error:';

    const prismaMessages = await this.handleError<PrismaMessage[]>(
      prisma.message.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
      errMsg,
    );
    const messages = this.messageMap.toDTOArr(prismaMessages);
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

    const messages = await this.handleError<PrismaMessage[]>(
      prisma.$queryRaw(query),
      errMsg,
    );

    log.info(
      `getMessagesWithinRange: number of messages found: ${messages.length}`,
    );
    return messages;
  };
}
