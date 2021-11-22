import Mapper from 'src/utils/Mappers/Mapper';
import { Message as PrismaMessage } from '@prisma/client';

export default class MessageMap extends Mapper<PrismaMessage, MessageDTO> {
  toDTO = (pMessage: PrismaMessage): MessageDTO => ({ ...pMessage });
}
