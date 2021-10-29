import type { CustomTypes } from 'slate';
import { useSelected, useFocused } from 'slate-react';

import * as S from './styles';

const Mention: React.FC<CustomTypes['RenderElementProps']> = ({
	attributes,
	children,
	element,
}) => {
	const selected = useSelected();
	const focused = useFocused();
	return (
		<S.Mention
			{...attributes}
			contentEditable={false}
			data-cy={`mention-${element.character.replace(' ', '-')}`}
			selected={selected}
			focused={focused}
		>
			@{element.character}
			{children}
		</S.Mention>
	);
};

export default Mention;
