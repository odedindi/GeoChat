interface UserDTO {
  id?: number;
  avatar: string;
  userID: string;
  socketID: string;
  username: string;
  room: string;
  beSeenBeyondRange: boolean;
  preferedDistance: number;
  geolocation_lat: number;
  geolocation_lng: number;
}

interface MessageDTO {
  id?: number;
  messageID: string;
  fromuser: string;
  content: string;
  createdat: string;
  geolocation_lat: number;
  geolocation_lng: number;
}
