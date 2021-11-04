import {findIndex} from 'lodash';
import * as log from '../config/logger';

export const users: User[] = [];

export interface UserRepository {
    addUser(user: User): void
}

export class InMemoryUserRepository implements UserRepository {
    addUser(user: User) {
        const match = findIndex(users, {id: user.id});
        if (match === -1) {
            log.info(`new user: ${user.id}, add user to users list`);
            users.push(user)
        } else {
            log.info('update user in users list');
            users[match] = user
        }
    }
}


export const userRepository = new UserRepository()