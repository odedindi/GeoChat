import { v4 as uuid } from 'uuid';

const formatMessage = (username: string, content: string): Message => ({
	messageID: uuid(),
	fromuser: username,
	content,
	createdat: Date.now(),
});

export default formatMessage;
