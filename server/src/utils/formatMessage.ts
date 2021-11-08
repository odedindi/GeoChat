import { v4 as uuid } from 'uuid';

const formatMessage = (username: string, text: string): Message => ({
	id: uuid(),
	from: username,
	text,
	createdAt: Date.now(),
});

export default formatMessage;
