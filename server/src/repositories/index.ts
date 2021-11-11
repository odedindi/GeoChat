import { DBUserRepository } from './postgresDB/db.user.queries';
import { DBMessageRepository } from './postgresDB/db.message.queries';

const userRepository = new DBUserRepository();
const messageRepository = new DBMessageRepository();

export { userRepository, messageRepository };
