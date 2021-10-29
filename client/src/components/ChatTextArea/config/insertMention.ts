import { Transforms } from 'slate';
import type { CustomTypes } from 'slate';

const insertMention = (
	editor: CustomTypes['Editor'],
	character: string,
): void => {
	const mention: CustomTypes['Element'] = {
		type: 'mention',
		character,
		children: [{ text: '' }],
	};
	Transforms.insertNodes(editor, mention);
	Transforms.move(editor);
};

export default insertMention;
