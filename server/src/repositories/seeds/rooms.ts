import { generate } from '../../utils';
import { Room } from '../model';

const roomsnames = {
	publicRoom: 'publicRoom',
};

const publicRoom = new Room({
	roomname: 'publicRoom',
});

const roomsDict = {
	publicRoom,
};
export { roomsnames, roomsDict };
