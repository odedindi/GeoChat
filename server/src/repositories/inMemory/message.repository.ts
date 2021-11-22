import log from 'src/config/logger';

const messages = new Set<MessageDTO>();

export class InMemoryMessageRepository implements MessageRepository {
	public addMessage = (message: MessageDTO) => {
		messages.add(message);
	};
	public getAllMessages = () => {
		const messagesList: MessageDTO[] = [];
		messages.forEach((message) => messagesList.push(message));
		return Promise.resolve(messagesList);
	};

	public getMessagesWithinRange = async (
		lat: number,
		lng: number,
		radius: number,
	) => {
		log.info(`not implemented yet`);
		const messagesList: MessageDTO[] = [];
		return messagesList;
	};
}
