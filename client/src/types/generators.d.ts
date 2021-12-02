type GenerateRandomNumberFrom1ToNumber = (num: number) => number;

type GenerateRandomString = () => string;

type GenerateAvatar = () => string;

type GenerateId = () => string;

type GenerateMentionableUsersFromUsersDTO = (
	users: UserDTO[],
) => MentionableUser[];

type GenerateMessageContentAndMentions = (userInput: string) => {
	content: string;
	mentions: {
		userID: string;
		username: string;
	}[];
};

type GenerateMessageToSendToServer = (
	userInput: string,
	geoPos: Position | null,
) => MessageFromUser;

type GenerateNewUser = () => User;

interface Generate {
	avatar: GenerateAvatar;
	id: GenerateId;
	mentionableUsersFromUsersDTO: GenerateMentionableUsersFromUsersDTO;
	messageToSendToServer: GenerateMessageToSendToServer;
	newUser: GenerateNewUser;
}
