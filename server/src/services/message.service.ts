import { Injectable } from '@nestjs/common';
import log from 'src/config/logger';
import { Prisma, Message as PrismaMessage } from '@prisma/client';
import { PrismaService } from './prisma.service';
import MessageMap from 'src/utils/Mappers/MessageMap';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}
  private messageMap = new MessageMap();
  private handleError = async <T>(cb: Promise<T>, errMsg: string) =>
    cb.catch((e: Error) => {
      log.error(`${errMsg}: ${e}`);
      throw e;
    });

  public addMessage = async (
    data: Prisma.MessageCreateInput,
  ): Promise<PrismaMessage> => {
    const errMsg = 'Prisma Message Repository add message error:';
    return this.handleError<PrismaMessage>(
      this.prisma.message.create({ data }),
      errMsg,
    );
  };

  public removeMessage = (
    where: Prisma.MessageWhereUniqueInput,
  ): Promise<PrismaMessage> => {
    const errMsg = 'Prisma Message Repository removeMessage error';
    return this.handleError(this.prisma.message.delete({ where }), errMsg);
  };
  public getMessage = async (
    messageWhereUniqueInput: Prisma.MessageWhereUniqueInput,
  ): Promise<MessageDTO[]> => {
    const errMsg = 'Prisma Message Repository getMessage error';
    const prismaMessage = await this.handleError(
      this.prisma.message.findUnique({ where: messageWhereUniqueInput }),
      errMsg,
    );
    if (prismaMessage) {
      const matchMessage = this.messageMap.toDTO(prismaMessage);
      return [matchMessage];
    }
    return [] as MessageDTO[];
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
  }): Promise<MessageDTO[]> => {
    const errMsg = 'Prisma Message Repository add message error:';

    const prismaMessages = await this.handleError(
      this.prisma.message.findMany({
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
  ): Promise<MessageDTO[]> => {
    const errMsg = 'Prisma Message Repository find messagesWithinRange error:';

    const query = Prisma.sql`
			SELECT
				*
			FROM
				"Message"
			WHERE
				ST_DWithin(ST_MakePoint(geolocation_lat,geolocation_lng), ST_MakePoint(${lat}, ${lng})::geography, ${radius} * 1000)
		`;

    const prismaMessages = await this.handleError<PrismaMessage[]>(
      this.prisma.$queryRaw(query),
      errMsg,
    );

    const messages = this.messageMap.toDTOArr(prismaMessages);
    log.info(
      `getMessagesWithinRange: number of messages found: ${messages.length}`,
    );
    return messages;
  };
}
