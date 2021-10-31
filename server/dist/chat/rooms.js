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
exports.roomsnames = exports.rooms = void 0;
const Generate = __importStar(require("../config/generators"));
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
        ],
        messages: [
            {
                from: {
                    id: 'fe5dk15',
                    name: 'Ervin Howell',
                    username: 'Ervinette',
                    email: 'Shanna@melissa.tv',
                    avatar: Generate.randomAvatar(),
                    currentRoomname: '',
                    geo: {
                        lat: '-43.9509',
                        lng: '-34.4618',
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
                    avatar: Generate.randomAvatar(),
                    currentRoomname: '',
                    geo: {
                        lat: '-37.3159',
                        lng: '81.1496',
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