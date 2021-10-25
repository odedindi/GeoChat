import colors from "colors";
import _ from "lodash";

const users: User[] = [];

type JoinUserToChat = (id: string, username: string, roomname: string) => User;
const joinUserToChat: JoinUserToChat = (id, username, roomname) => {
  const user = { id, username, roomname };
  users.push(user);
  return user;
};

console.log(colors.magenta("user out"), users);

const getCurrentUser = (id: string) => _.find(users, (user) => user.id === id);

// called when the user leaves the chat and its user object deleted from array
const userDisconnect = (id: string) => {
  const userIndex = _.findIndex(users, (user) => user.id === id);

  if (userIndex !== -1) return users.splice(userIndex, 1)[0];
};

export { joinUserToChat, getCurrentUser, userDisconnect };
