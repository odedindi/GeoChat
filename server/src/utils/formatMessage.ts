import { v4 as uuid } from 'uuid';

const formatMessage = (
  username: string,
  content: string,
  coord: Coord = { lat: 0, lng: 0 },
): MessageDTO => ({
  messageID: uuid(),
  fromuser: username,
  content,
  createdat: Date.now().toString(),
  geolocation_lat: coord.lat,
  geolocation_lng: coord.lng,
});

export default formatMessage;
