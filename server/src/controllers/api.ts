import jwt from 'jsonwebtoken';
import * as C from '../config/constants';

export const createToken = (user: User) => jwt.sign(user, C.secret);

export const generateRandomId = () => Math.random().toString(24).substring(7);

export const generateRandomNumberFrom1ToNumber = (num: number) =>
	Math.floor(Math.random() * num) + 1;

export const generateRandomString = () => {
	let result: string;
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let index = 0; index < generateRandomNumberFrom1ToNumber(100); index++) {
		result += characters.charAt(
			generateRandomNumberFrom1ToNumber(characters.length),
		);
	}
	return result;
};

export const generateRandomAvatar = () =>
	`https://robohash.org/${generateRandomString()}`;
