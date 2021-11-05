import { v4 as uuid } from 'uuid';

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

const avatar = (): string => `https://robohash.org/${generateRandomString()}`;
const id = (): string => uuid();

const generate = { avatar, id };
export default generate;
