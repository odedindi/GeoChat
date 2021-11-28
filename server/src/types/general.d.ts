interface Coord {
  lat: number;
  lng: number;
}

interface MentionedUser {
  userID: string;
  username: string;
}

interface MessageFromUser {
  mentions: MentionedUser[];
  content: string;
  coord: Coord;
}
