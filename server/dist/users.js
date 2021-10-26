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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDisconnect = exports.getCurrentUser = exports.joinUserToChat = void 0;
const colors_1 = __importDefault(require("colors"));
const lodash_1 = __importDefault(require("lodash"));
const API = __importStar(require("./controllers/api"));
const users = [
    {
        id: API.generateRandomId(),
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-37.3159',
            lng: '81.1496',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-43.9509',
            lng: '-34.4618',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-68.6102',
            lng: '-47.0653',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '29.4572',
            lng: '-164.2990',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-31.8129',
            lng: '62.5342',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-71.4197',
            lng: '71.7478',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '24.8918',
            lng: '21.8984',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-14.3990',
            lng: '-120.7677',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '24.6463',
            lng: '-168.8889',
        },
    },
    {
        id: API.generateRandomId(),
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        avatar: API.generateRandomAvatar(),
        currentRoomname: '',
        geo: {
            lat: '-38.2386',
            lng: '57.2232',
        },
    },
];
const chatRooms = [
    {
        roomname: 'generalChatRoom',
        users: [
            {
                id: API.generateRandomId(),
                name: 'Glenna Reichert',
                username: 'Delphine',
                email: 'Chaim_McDermott@dana.io',
                avatar: API.generateRandomAvatar(),
                currentRoomname: '',
                geo: {
                    lat: '24.6463',
                    lng: '-168.8889',
                },
            },
            {
                id: API.generateRandomId(),
                name: 'Clementina DuBuque',
                username: 'Moriah.Stanton',
                email: 'Rey.Padberg@karina.biz',
                avatar: API.generateRandomAvatar(),
                currentRoomname: '',
                geo: {
                    lat: '-38.2386',
                    lng: '57.2232',
                },
            },
        ],
        messages: [],
    },
];
const joinUserToChat = (id, username, roomname) => {
    const user = { id, username, roomname };
    const roomIndex = chatRooms.findIndex((room) => room.roomname === roomname);
    if (roomIndex === -1) {
        chatRooms.push({ roomname, users: [user], messages: [] });
    }
    else {
        chatRooms[roomIndex].users.push(user);
    }
    users.push(user);
    return user;
};
exports.joinUserToChat = joinUserToChat;
console.log(colors_1.default.magenta('user out'), users);
const getCurrentUser = (id) => lodash_1.default.find(users, (user) => user.id === id);
exports.getCurrentUser = getCurrentUser;
// called when the user leaves the chat and its user object deleted from array
const userDisconnect = (id) => {
    const userIndex = lodash_1.default.findIndex(users, (user) => user.id === id);
    if (userIndex !== -1)
        return users.splice(userIndex, 1)[0];
};
exports.userDisconnect = userDisconnect;
//# sourceMappingURL=users.js.map