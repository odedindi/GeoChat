export const mentionableUsersFromUsersDTO = (
	users: UserDTO[],
): MentionableUser[] =>
	users.map(({ userID, username }) => ({
		id: userID,
		display: username,
	}));
