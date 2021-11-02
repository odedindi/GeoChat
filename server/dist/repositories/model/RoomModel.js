class RoomModel {
    constructor(chatRoomModel) {
        this._chatRoomModel = chatRoomModel;
    }
    get roomname() {
        return this._chatRoomModel.roomname;
    }
    get users() {
        return this._chatRoomModel.users;
    }
    get messages() {
        return this._chatRoomModel.messages;
    }
}
Object.seal(RoomModel);
//# sourceMappingURL=RoomModel.js.map