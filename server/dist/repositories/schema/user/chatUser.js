"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../../config");
const services_1 = require("../../../services");
class ChatUser {
    constructor(name, socketId, username, avatar, currentRoomname, email, geo) {
        this.roomsHistory = [];
        // getters
        this.getAvatar = () => this.avatar;
        this.getCurrentRoomname = () => this.currentRoomname;
        this.getEmail = () => this.email;
        this.getGeo = () => this.geo;
        this.getId = () => this.id;
        this.getName = () => this.name;
        this.getRoomsHistory = () => this.roomsHistory;
        this.getUsername = () => this.username;
        this.getSocketId = () => this.socketId;
        // setters
        this.setAvatar = (path) => (this.avatar = path);
        this.setCurrentRoomname = (newRoomname) => {
            this.setRoomsHistory(this.currentRoomname);
            this.currentRoomname = newRoomname;
        };
        this.setEmail = (newEmail) => (this.email = newEmail);
        this.setGeoLocation = (geoLocaion) => (this.geo = Object.assign(Object.assign({}, this.geo), { coord: geoLocaion }));
        this.setPreferedDistance = (newPreferedDistance) => (this.geo = Object.assign(Object.assign({}, this.geo), { preferedDistance: newPreferedDistance }));
        this.setName = (newName) => (this.name = newName);
        this.setRoomsHistory = (roomname) => !this.roomsHistory.length
            ? (this.roomsHistory = [roomname])
            : this.roomsHistory.push(roomname);
        this.setUsername = (newUsername) => (this.username = newUsername);
        this.setSocketId = (newSocketId) => (this.socketId = newSocketId);
        this.avatar = avatar ? avatar : config_1.generate.avatar();
        this.currentRoomname = currentRoomname
            ? currentRoomname
            : services_1.chat.roomsnames.publicRoom;
        this.email = email ? email : '';
        this.geo = geo ? geo : { preferedDistance: 40 };
        this.id = config_1.generate.id();
        this.name = name;
        this.socketId = socketId;
        this.username = username;
    }
}
exports.default = ChatUser;
//# sourceMappingURL=chatUser.js.map