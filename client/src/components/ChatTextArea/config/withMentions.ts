import type { CustomTypes } from 'slate';

const withMentions = (editor: CustomTypes['Editor']): any => {
	const { isInline, isVoid } = editor;

	editor.isInline = (element: CustomTypes['Element']) => {
		return element.type === 'mention' ? true : isInline(element);
	};

	editor.isVoid = (element: CustomTypes['Element']) => {
		return element.type === 'mention' ? true : isVoid(element);
	};

	return editor;
};

export default withMentions;
