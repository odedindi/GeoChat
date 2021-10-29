import * as Generate from '../config/generators';

const roomsnames = {
	publicRoom: 'publicRoom',
};

const rooms: Room[] = [
	{
		roomname: roomsnames.publicRoom,
		users: ['fe51k85', 'fe5dk15'],
		messages: [
			{
				from: {
					id: 'fe5dk15',
					name: 'Ervin Howell',
					username: 'Antonette',
					email: 'Shanna@melissa.tv',
					avatar: Generate.randomAvatar(),
					currentRoomname: '',
					geo: {
						lat: '-43.9509',
						lng: '-34.4618',
					},
				},
				text: 'hey guys',
				createdAt: 1635460121113,
				id: 'an00jg4',
			},
			{
				from: {
					id: 'fe51k85',
					name: 'Leanne Graham',
					username: 'Bret',
					email: 'Sincere@april.biz',
					avatar: Generate.randomAvatar(),
					currentRoomname: '',
					geo: {
						lat: '-37.3159',
						lng: '81.1496',
					},
				},
				text: 'hey Ervin',
				createdAt: 1635460217424,
				id: 'ma89h63',
			},
		],
	},
];

export { rooms, roomsnames };