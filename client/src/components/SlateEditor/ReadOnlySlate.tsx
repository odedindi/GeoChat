import * as React from 'react';
import type { CustomTypes, Descendant } from 'slate';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { Element } from '../SlateEditor';

const ReadOnlySlate: React.FC<CustomTypes['ReadOnlySlateProps']> = ({
	value,
}) => {
	const renderElement = React.useCallback(
		(props) => <Element {...props} />,
		[],
	);
	const editor = React.useMemo(() => withReact(createEditor()), []);

	return (
		<Slate editor={editor} value={value as Descendant[]} onChange={() => null}>
			<Editable renderElement={renderElement} readOnly />
		</Slate>
	);
};

export default ReadOnlySlate;
