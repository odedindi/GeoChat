/* eslint-disable no-case-declarations */
import * as React from 'react';
import type { Descendant } from 'slate';
import { Editor, Transforms, createEditor, Range } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, ReactEditor, withReact } from 'slate-react';

import Element from './Element';
import Portal from './Portal';
import * as config from './config';
import * as S from './styles';

const TextArea: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const ref = React.useRef<HTMLDivElement | null>(undefined!);

	const [value, setValue] = React.useState<Descendant[]>(config.initialValue);
	const [target, setTarget] = React.useState<Range | null>(null);
	const [index, setIndex] = React.useState(0);
	const [search, setSearch] = React.useState('');
	const renderElement = React.useCallback(
		(props) => <Element {...props} />,
		[],
	);
	const editor = React.useMemo(
		() => config.withMentions(withReact(withHistory(createEditor()))),
		[],
	);

	const mentionableUsers = config.mentionableUsers
		.filter((c) => c.toLowerCase().startsWith(search.toLowerCase()))
		.slice(0, 10);

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
						config.insertMention(editor, mentionableUsers[index]);
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
				setValue(value);
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
			<Editable
				renderElement={renderElement}
				onKeyDown={onKeyDown}
				placeholder="Enter some text..."
			/>
			{target && mentionableUsers.length && (
				<Portal>
					<S.MentionableUsersWrapper ref={ref} data-cy="mentions-portal">
						{mentionableUsers.map((char, i) => (
							<S.MentionableUsers key={char} transparent={i === index}>
								{char}
							</S.MentionableUsers>
						))}
					</S.MentionableUsersWrapper>
				</Portal>
			)}
		</Slate>
	);
};

export default TextArea;
