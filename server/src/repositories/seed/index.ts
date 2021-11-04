import { User } from '../model';
import { generate } from '@src/utils';

const bret = new User({
	id: 'fe51k85',
	username: 'Bret',
	avatar: generate.avatar(),
	roomHistory: [],
	geo: {
		coord: {
			lat: '-37.3159',
			lng: '81.1496',
		},
		preferedDistance: 40,
	},
});
const antonette = new User({
	id: 'fe5dk15',
	username: 'Antonette',
	avatar: generate.avatar(),
	roomHistory: [],
	geo: {
		coord: {
			lat: '-43.9509',
			lng: '-34.4618',
		},
		preferedDistance: 40,
	},
});
const samantha = new User({
	id: 'fe51k2q',
	username: 'Samantha',
	avatar: generate.avatar(),
	roomHistory: [],
	geo: {
		coord: {
			lat: '-68.6102',
			lng: '-47.0653',
		},
		preferedDistance: 40,
	},
});

const users = [bret, antonette, samantha];

const seed = { users };
export default seed;
