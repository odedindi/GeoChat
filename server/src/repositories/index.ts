import { PrismaUserRepository } from './user.repository';
import { PrismaMessageRepository } from './message.repository';

const userRepository = new PrismaUserRepository();
const messageRepository = new PrismaMessageRepository();

export { userRepository, messageRepository };
