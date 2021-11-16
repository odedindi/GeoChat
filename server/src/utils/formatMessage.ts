import { v4 as uuid } from 'uuid';

const formatMessage = (username: string, content: string): MessageDTO => ({
	messageID: uuid(),
	fromuser: username,
	content,
	createdat: Date.now().toString(),
	geolocation_lat: '',
	geolocation_lng: '',
});

export default formatMessage;
