import { InMemorySessionRepository } from './session.repository';
import { InMemoryUserRepository } from './user.repository';
import { InMemoryRoomRepository } from './room.repository';
import { InMemoryMessageRepository } from './message.repository';

const sessionRepository = new InMemorySessionRepository();
const roomRepository = new InMemoryRoomRepository();
const userRepository = new InMemoryUserRepository();
const messageRepository = new InMemoryMessageRepository();

export { sessionRepository, roomRepository, userRepository, messageRepository };
