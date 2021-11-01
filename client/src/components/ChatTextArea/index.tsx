/* eslint-disable no-case-declarations */
import * as React from 'react';
import type { CustomTypes } from 'slate';
import { Editor, Transforms, createEditor, Range } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, ReactEditor, withReact } from 'slate-react';
import { getLogger } from 'src/utils/logger';

import * as SlateEditor from '../SlateEditor';

import * as S from './styles';

const log = getLogger('TextArea Component');

type TextAreaProps = {
	mentionables: User[];
	placeholder: string;
	setValue: React.Dispatch<
		React.SetStateAction<CustomTypes['ParagraphElement'][]>
	>;
	value: CustomTypes['ParagraphElement'][];
};
const TextArea: React.FC<TextAreaProps> = ({
	mentionables,
	placeholder,
	setValue,
	value,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const ref = React.useRef<HTMLDivElement | null>(undefined!);
	const [target, setTarget] = React.useState<Range | null>(null);
	const [index, setIndex] = React.useState(0);
	const [search, setSearch] = React.useState('');
	const renderElement = React.useCallback(
		(props) => <SlateEditor.Element {...props} />,
		[],
	);
	const editor = React.useMemo(
		() =>
			SlateEditor.config.withMentions(withReact(withHistory(createEditor()))),
		[],
	);

	const [mentionableUsers, setMentionableUsersState] = React.useState<string[]>(
		[],
	);
	React.useEffect(() => {
		if (mentionables.length) {
			setMentionableUsersState(
				() => mentionables.map((user) => user.username) as string[],
			);
		}
	}, [mentionables]);

	const onKeyDown = React.useCallback(
		(event) => {
			if (target) {
				switch (event.key) {
					case 'ArrowDown':
						event.preventDefault();
						const prevIndex =
							index >= mentionableUsers.length - 1 ? 0 : index + 1;
						setIndex(prevIndex);
						break;
					case 'ArrowUp':
						event.preventDefault();
						const nextIndex =
							index <= 0 ? mentionableUsers.length - 1 : index - 1;
						setIndex(nextIndex);
						break;
					case 'Tab':
					case 'Enter':
						event.preventDefault();
						Transforms.select(editor, target);
						SlateEditor.config.insertMention(editor, mentionableUsers[index]);
						setTarget(null);
						break;
					case 'Escape':
						event.preventDefault();
						setTarget(null);
						break;
				}
			}
		},
		[mentionableUsers, editor, index, target],
	);

	React.useEffect(() => {
		if (target && mentionableUsers.length) {
			const refElement = ref.current;
			const domRange = ReactEditor.toDOMRange(editor, target);
			const rect = domRange.getBoundingClientRect();
			if (refElement) {
				refElement.style.top = `${rect.top + window.pageYOffset + 24}px`;
				refElement.style.left = `${rect.left + window.pageXOffset}px`;
			}
		}
	}, [mentionableUsers.length, editor, index, search, target]);

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(value) => {
				const paragraph = value as CustomTypes['ParagraphElement'][];
				setValue(paragraph);
				const { selection } = editor;

				if (selection && Range.isCollapsed(selection)) {
					const [start] = Range.edges(selection);
					const wordBefore = Editor.before(editor, start, { unit: 'word' });
					const before = wordBefore && Editor.before(editor, wordBefore);
					const beforeRange = before && Editor.range(editor, before, start);
					const beforeText = beforeRange && Editor.string(editor, beforeRange);
					// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
					const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
					const after = Editor.after(editor, start);
					const afterRange = Editor.range(editor, start, after);
					const afterText = Editor.string(editor, afterRange);
					const afterMatch = afterText.match(/^(\s|$)/);

					if (beforeMatch && afterMatch) {
						setTarget(beforeRange);
						setSearch(beforeMatch[1]);
						setIndex(0);
						return;
					}
				}

				setTarget(null);
			}}
		>
			<S.Editable
				renderElement={renderElement}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				onSelect={(e) => {
					// Chrome doesn't scroll at bottom of the page. This fixes that.
					if (!(window as any).chrome) return;
					if (editor.selection == null) return;
					try {
						// Need a try/catch because sometimes you get an error like:
						// Error: Cannot resolve a DOM node from Slate node: {"type":"p","children":[{"text":"","by":-1,"at":-1}]}

						const domPoint = ReactEditor.toDOMPoint(
							editor,
							editor.selection.focus,
						);
						const node = domPoint[0];
						if (node == null) return;
						const element = node.parentElement;
						if (element == null) return;
						element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
					} catch (e) {
						log(`Error: ${e}`);
					}
				}}
			/>
			{target && mentionableUsers.length && (
				<SlateEditor.Portal>
					<S.MentionableUsersWrapper ref={ref} data-cy="mentions-portal">
						{mentionableUsers.map((char, i) => (
							<S.MentionableUsers key={char} transparent={i === index}>
								{char}
							</S.MentionableUsers>
						))}
					</S.MentionableUsersWrapper>
				</SlateEditor.Portal>
			)}
		</Slate>
	);
};

export default TextArea;
