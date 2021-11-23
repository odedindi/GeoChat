import { Message as PrismaMessage } from '@prisma/client';
import Mapper from './Mapper';

export default class MessageMap extends Mapper<PrismaMessage, MessageDTO> {
  toDTO = (pMessage: PrismaMessage): MessageDTO => ({ ...pMessage });
}
