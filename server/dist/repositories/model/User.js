"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userModel) {
        this._model = userModel;
    }
    get avatar() {
        return this._model.avatar;
    }
    get email() {
        return this._model.email;
    }
    get geo() {
        return this._model.geo;
    }
    get id() {
        return this._model.id;
    }
    get name() {
        return this._model.name;
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
    newGeoLocation(geoLocation) {
        this._model.geo.coord = geoLocation;
    }
    newPreferedDistance(distance) {
        this._model.geo.preferedDistance = distance;
    }
    newRoom(newRoomname) {
        if (this._model.roomHistory[0] !== newRoomname)
            this._model.roomHistory.unshift(newRoomname);
    }
}
exports.User = User;
Object.seal(User);
//# sourceMappingURL=User.js.map