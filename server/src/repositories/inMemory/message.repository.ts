const messages = new Set<Message>();

export class InMemoryMessageRepository implements MessageRepository {
	addMessage = (message: Message) => {
		messages.add(message);
	};
	getAllMessages = () => {
		const messagesList: Message[] = [];
		messages.forEach((message) => messagesList.push(message));
		return Promise.resolve(messagesList);
	};
}
