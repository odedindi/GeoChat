const messages = new Set<Message>();

export interface MessageRepository {
	addMessage: (message: Message) => void;
	getAllMessages: () => Message[];
}

export class InMemoryMessageRepository implements MessageRepository {
	addMessage = (message: Message) => {
		messages.add(message);
	};
	getAllMessages = () => {
		const messagesList: Message[] = [];
		messages.forEach((message) => messagesList.push(message));
		return messagesList;
	};
}
