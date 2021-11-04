"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const lodash_1 = __importDefault(require("lodash"));
class User {
    constructor(userModel) {
        this.newGeoLocation = (geoLocation) => {
            this._model.geo.coord = geoLocation;
        };
        this.newPreferedDistance = (distance) => {
            this._model.geo.preferedDistance = distance;
        };
        this.newRoom = (newRoomname) => {
            if (this._model.roomHistory[0] !== newRoomname)
                this._model.roomHistory.unshift(newRoomname);
        };
        this.newOutgoingMessage = (message) => {
            if (lodash_1.default.findIndex(this.messagesSent, (msg) => msg.id === message.id) !== -1)
                this.messagesSent.push(message);
        };
        this.newIncomingMessage = (message) => {
            if (lodash_1.default.findIndex(this.messagesIncoming, (msg) => msg.id === message.id) !== -1)
                this.messagesIncoming.push(message);
        };
        this._model = userModel;
        this.messagesSent = [];
        this.messagesIncoming = [];
    }
    get avatar() {
        return this._model.avatar;
    }
    get geo() {
        return this._model.geo;
    }
    get id() {
        return this._model.id;
    }
    get roomHistory() {
        return this._model.roomHistory;
    }
    get username() {
        return this._model.username;
    }
    set updateAvatar(avatar) {
        this._model.avatar = avatar;
    }
    get allData() {
        return {
            avatar: this._model.avatar,
            geo: this._model.geo,
            id: this._model.id,
            roomHistory: this._model.roomHistory,
            username: this._model.username,
        };
    }
}
exports.User = User;
Object.seal(User);
//# sourceMappingURL=User.js.map