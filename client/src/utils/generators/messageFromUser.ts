export const messageContentAndMentions: GenerateMessageContentAndMentions = (
	userInput,
) => {
	const regex = /@\[.+?\]\(.+?\)/gm;
	const displayRegex = /@\[.+?\]/g;
	const idRegex = /\(.+?\)/g;
	const matches = userInput.match(regex);

	const mentions = matches
		? matches.map((mention) => {
				const userID = (mention.match(idRegex) as RegExpMatchArray)[0]
					.replace('(', '')
					.replace(')', '');
				const username = (mention.match(displayRegex) as RegExpMatchArray)[0]
					.replace('@[', '')
					.replace(']', '');
				return { userID: userID, username: username };
		  })
		: [];

	const splittedInput = userInput.split(regex);

	let content = '';
	for (let index = 0; index < splittedInput.length; index++) {
		const contentFragment = splittedInput[index];
		if (index === splittedInput.length - 1) content += contentFragment;
		else content += `${contentFragment}@${mentions[index].username}`;
	}

	return { content, mentions };
};

export const messageToSendToServer: GenerateMessageToSendToServer = (
	userInput,
	geoPos,
) => {
	const { content, mentions } = messageContentAndMentions(userInput);

	return {
		mentions,
		content,
		coord: {
			lat: geoPos?.latitude ? geoPos.latitude : 0,
			lng: geoPos?.longitude ? geoPos.longitude : 0,
		},
	};
};
