import { ChatApp, Room } from '@src/repositories/model';
import { publicRoomName } from '@src/config/constants';
import seed from '@src/repositories/seed';

const publicRoom = new Room({
	roomname: publicRoomName,
	users: [],
	messages: [],
});

for (const user of seed.users) publicRoom.newUser(user);

const geoChat = new ChatApp({
	users: [],
	rooms: [],
});

geoChat.newRoom(publicRoom);

export default geoChat;
