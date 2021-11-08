import { InMemoryUserRepository } from './user.repository';
import { InMemoryRoomRepository } from './room.repository';
import { InMemoryMessageRepository } from './message.repository';

const roomRepository = new InMemoryRoomRepository();
const userRepository = new InMemoryUserRepository();
const messageRepository = new InMemoryMessageRepository();

export { roomRepository, userRepository, messageRepository };
