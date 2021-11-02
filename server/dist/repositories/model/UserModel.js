class UserModel {
    constructor(chatUserModel) {
        this._chatUserModel = chatUserModel;
    }
    get avatar() {
        return this._chatUserModel.avatar;
    }
    get currentRoomname() {
        return this._chatUserModel.currentRoomname;
    }
    get email() {
        return this._chatUserModel.email;
    }
    get geo() {
        return this._chatUserModel.geo;
    }
    get id() {
        return this._chatUserModel.id;
    }
    get socketId() {
        return this._chatUserModel.socketId;
    }
    get name() {
        return this._chatUserModel.name;
    }
    get roomHistroy() {
        return this._chatUserModel.roomHistory;
    }
    get username() {
        return this._chatUserModel.username;
    }
}
Object.seal(UserModel);
//# sourceMappingURL=UserModel.js.map