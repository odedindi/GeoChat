export class Message {
	private _model: IMessage;

	constructor(messageModel: IMessage) {
		this._model = messageModel;
	}

	get createdAt(): number {
		return this._model.createdAt;
	}
	get from(): IUser {
		return this._model.from;
	}
	get id(): string {
		return this._model.id;
	}
	get text(): string {
		return this._model.text;
	}
}

Object.seal(Message);
