import { v4 as uuid } from 'uuid';
export const id = () => uuid();

export const randomNumberFrom1ToNumber = (num: number) =>
	Math.floor(Math.random() * num) + 1;

export const randomString = () => {
	let result: string;
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let index = 0; index < randomNumberFrom1ToNumber(100); index++) {
		result += characters.charAt(randomNumberFrom1ToNumber(characters.length));
	}
	return result;
};

export const avatar = () => `https://robohash.org/${randomString()}`;
