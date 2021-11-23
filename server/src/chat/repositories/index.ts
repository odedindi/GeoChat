// import { DBUserRepository } from './postgresDB/db.user.queries';
// import { DBMessageRepository } from './postgresDB/db.message.queries';
import { PrismaUserRepository } from './prisma/users.queries';
import { PrismaMessageRepository } from './prisma/messages.queries';

const userRepository = new PrismaUserRepository();
const messageRepository = new PrismaMessageRepository();

export { userRepository, messageRepository };
