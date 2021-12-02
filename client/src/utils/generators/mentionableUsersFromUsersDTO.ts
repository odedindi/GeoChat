export const mentionableUsersFromUsersDTO: GenerateMentionableUsersFromUsersDTO =
	(users) =>
		users.map(({ userID, username }) => ({
			id: userID,
			display: username,
		}));
