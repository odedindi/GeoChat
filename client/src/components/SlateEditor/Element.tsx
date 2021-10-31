import type { CustomTypes } from 'slate';

import Mention from './Mention';

const Element: React.FC<CustomTypes['RenderElementProps']> = ({
	attributes,
	children,
	element,
}) => {
	if (element.type === 'mention')
		return (
			<Mention attributes={attributes} element={element}>
				{children}
			</Mention>
		);
	return <p {...attributes}>{children}</p>;
};

export default Element;
