class MessageModel {
	private _chatMessageModel: IMessageModel;

	constructor(chatMessageModel: IMessageModel) {
		this._chatMessageModel = chatMessageModel;
	}

	get createdAt(): number {
		return this._chatMessageModel.createdAt;
	}
	get from(): IUserModel {
		return this._chatMessageModel.from;
	}
	get id(): string {
		return this._chatMessageModel.id;
	}
	get text(): string {
		return this._chatMessageModel.text;
	}
}

Object.seal(MessageModel);
