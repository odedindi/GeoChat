import { avatar } from './avatar';
import { id } from './id';
import { mentionableUsersFromUsersDTO } from './mentionableUsersFromUsersDTO';
import { messageToSendToServer } from './messageFromUser';
import { newUser } from './newUser';

const generate: Generate = {
	avatar,
	id,
	mentionableUsersFromUsersDTO,
	messageToSendToServer,
	newUser,
};

export default generate;
