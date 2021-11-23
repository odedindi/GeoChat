import { v4 as uuid } from 'uuid';

const id = () => uuid();

const randomNumberFrom1ToNumber = (num: number) =>
  Math.floor(Math.random() * num) + 1;

const randomString = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let index = 0; index < randomNumberFrom1ToNumber(100); index++) {
    result += characters.charAt(randomNumberFrom1ToNumber(characters.length));
  }
  return result;
};

const avatar = () => `https://robohash.org/${randomString()}`;

export const generate = { id, randomNumberFrom1ToNumber, randomString, avatar };
