import _ from 'lodash';
import log from 'src/config/logger';

export const messages: Message[] = [];

export interface MessageRepository {
	findIndexById: (id: MessageID) => number;
	saveMessage: (msg: Message) => void;
	findUserMessages: (userID: string) => Message[];
}

export class InMemoryMessageRepository implements MessageRepository {
	findIndexById = (id: MessageID) =>
		_.findIndex(messages, (msg) => id === msg.id);

	saveMessage = (msg: Message) => {
		const match = this.findIndexById(msg.id);
		if (match === -1) {
			log.info(`save message: ${msg.id}`);
			messages.push(msg);
		} else log.error(`saveMessge, message: ${msg.id} already exist`);
	};

	findUserMessages = (userID: string) =>
		messages.filter(({ from, to }) => from.id === userID || to.id === userID);
}
