const randomNumberFrom1ToNumber: GenerateRandomNumberFrom1ToNumber = (num) =>
	Math.floor(Math.random() * num) + 1;

const randomString: GenerateRandomString = () => {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let index = 0; index < randomNumberFrom1ToNumber(100); index++) {
		result += characters.charAt(randomNumberFrom1ToNumber(characters.length));
	}
	return result;
};

export const avatar: GenerateAvatar = () =>
	`https://robohash.org/${randomString()}`;
