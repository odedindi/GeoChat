"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsnames = exports.rooms = void 0;
const config_1 = require("../config");
const roomsnames = {
    publicRoom: 'publicRoom',
};
exports.roomsnames = roomsnames;
const rooms = [
    {
        roomname: roomsnames.publicRoom,
        users: [
            {
                id: 'fe51k85',
                name: 'Leanne Graham',
                username: 'Bret',
                email: 'Sincere@april.biz',
                avatar: config_1.generate.avatar(),
                currentRoomname: '',
                geo: {
                    coord: { lat: '-37.3159', lng: '81.1496' },
                    preferedDistance: 40,
                },
            },
            {
                id: 'fe5dk15',
                name: 'Ervin Howell',
                username: 'Antonette',
                email: 'Shanna@melissa.tv',
                avatar: config_1.generate.avatar(),
                currentRoomname: '',
                geo: {
                    coord: { lat: '-43.9509', lng: '-34.4618' },
                    preferedDistance: 50,
                },
            },
        ],
        messages: [
            {
                from: {
                    id: 'fe5dk15',
                    name: 'Ervin Howell',
                    username: 'Ervinette',
                    email: 'Shanna@melissa.tv',
                    avatar: config_1.generate.avatar(),
                    currentRoomname: '',
                    geo: {
                        coord: { lat: '-43.9509', lng: '-34.4618' },
                        preferedDistance: 50,
                    },
                },
                text: '[{"type":"paragraph","children":[{"text":"hey guys"}]}]',
                createdAt: 1635460121113,
                id: 'an00jg4',
            },
            {
                from: {
                    id: 'fe51k85',
                    name: 'Leanne Graham',
                    username: 'Leanne',
                    email: 'Sincere@april.biz',
                    avatar: config_1.generate.avatar(),
                    currentRoomname: '',
                    geo: {
                        coord: { lat: '-37.3159', lng: '81.1496' },
                        preferedDistance: 40,
                    },
                },
                text: '[{"type":"paragraph","children":[{"text":"hey "},{"type":"mention","character":"Bret","children":[{"text":""}]},{"text":""}]}]',
                createdAt: 1635460217424,
                id: 'ma89h63',
            },
        ],
    },
];
exports.rooms = rooms;
//# sourceMappingURL=rooms.js.map