class MessageModel {
    constructor(chatMessageModel) {
        this._chatMessageModel = chatMessageModel;
    }
    get createdAt() {
        return this._chatMessageModel.createdAt;
    }
    get from() {
        return this._chatMessageModel.from;
    }
    get id() {
        return this._chatMessageModel.id;
    }
    get text() {
        return this._chatMessageModel.text;
    }
}
Object.seal(MessageModel);
//# sourceMappingURL=MessageModel.js.map