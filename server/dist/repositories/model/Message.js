"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(messageModel) {
        this._model = messageModel;
    }
    get createdAt() {
        return this._model.createdAt;
    }
    get from() {
        return this._model.from;
    }
    get id() {
        return this._model.id;
    }
    get text() {
        return this._model.text;
    }
}
exports.Message = Message;
Object.seal(Message);
//# sourceMappingURL=Message.js.map