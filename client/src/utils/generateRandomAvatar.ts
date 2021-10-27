const generateRandomNumberFrom1ToNumber = (num: number) =>
	Math.floor(Math.random() * num) + 1;

const generateRandomString = () => {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let index = 0; index < generateRandomNumberFrom1ToNumber(100); index++) {
		result += characters.charAt(
			generateRandomNumberFrom1ToNumber(characters.length),
		);
	}
	return result;
};

export const generateRandomAvatar = (): string =>
	`https://robohash.org/${generateRandomString()}`;
