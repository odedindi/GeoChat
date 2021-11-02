"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.activeUsers = void 0;
const config_1 = require("../config");
// seed
const users = [
    {
        id: 'fe51k85',
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-37.3159',
                lng: '81.1496',
            },
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
            coord: {
                lat: '-43.9509',
                lng: '-34.4618',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 'fe51k2q',
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-68.6102',
                lng: '-47.0653',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 'vew1281',
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '29.4572',
                lng: '-164.2990',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 'aed1k11',
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-31.8129',
                lng: '62.5342',
            },
            preferedDistance: 40,
        },
    },
    {
        id: '12s1ka5',
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-71.4197',
                lng: '71.7478',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 're5bsa5',
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '24.8918',
                lng: '21.8984',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 'ee51185',
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-14.3990',
                lng: '-120.7677',
            },
            preferedDistance: 40,
        },
    },
    {
        id: 'fx52kk5',
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '24.6463',
                lng: '-168.8889',
            },
            preferedDistance: 40,
        },
    },
    {
        id: '1ee1k25',
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        avatar: config_1.generate.avatar(),
        currentRoomname: '',
        geo: {
            coord: {
                lat: '-38.2386',
                lng: '57.2232',
            },
            preferedDistance: 40,
        },
    },
];
exports.users = users;
const activeUsers = [];
exports.activeUsers = activeUsers;
//# sourceMappingURL=users.js.map