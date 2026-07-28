export type Coord = { lat: number; lng: number };

export type User = {
  userID: string;
  username: string;
  avatar: string;
  socketID: string;
  room: string;
  geo: { coord: Coord; preferedDistance: number };
  beSeenBeyondRange: boolean;
};

export type UserDTO = {
  userID: string;
  username: string;
  avatar: string;
  socketID: string;
  room: string;
  preferedDistance: number;
  geolocation_lat: number;
  geolocation_lng: number;
  beSeenBeyondRange: boolean;
};

export type Message = {
  messageID: string;
  fromuser: string;
  content: string;
  createdat: string;
  geolocation_lat: number;
  geolocation_lng: number;
};

export type Mention = { userID: string; username: string };

export type MessageFromUser = {
  content: string;
  coord: Coord;
  mentions: Mention[];
};

export const userToDTO = (u: User): UserDTO => ({
  userID: u.userID,
  username: u.username,
  avatar: u.avatar,
  socketID: u.socketID,
  room: u.room,
  preferedDistance: u.geo.preferedDistance,
  geolocation_lat: u.geo.coord.lat,
  geolocation_lng: u.geo.coord.lng,
  beSeenBeyondRange: u.beSeenBeyondRange,
});
