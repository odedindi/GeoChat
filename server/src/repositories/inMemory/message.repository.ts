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
}
