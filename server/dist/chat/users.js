"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.activeUsers = void 0;
const Generate = __importStar(require("../config/generators"));
const users = [
    {
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
    {
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
    {
        id: 'fe51k2q',
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-68.6102',
            lng: '-47.0653',
        },
    },
    {
        id: 'vew1281',
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '29.4572',
            lng: '-164.2990',
        },
    },
    {
        id: 'aed1k11',
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-31.8129',
            lng: '62.5342',
        },
    },
    {
        id: '12s1ka5',
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-71.4197',
            lng: '71.7478',
        },
    },
    {
        id: 're5bsa5',
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '24.8918',
            lng: '21.8984',
        },
    },
    {
        id: 'ee51185',
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-14.3990',
            lng: '-120.7677',
        },
    },
    {
        id: 'fx52kk5',
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '24.6463',
            lng: '-168.8889',
        },
    },
    {
        id: '1ee1k25',
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        avatar: Generate.randomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-38.2386',
            lng: '57.2232',
        },
    },
];
exports.users = users;
const activeUsers = [];
exports.activeUsers = activeUsers;
//# sourceMappingURL=users.js.map