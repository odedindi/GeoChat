import * as React from 'react';
import type { SuggestionDataItem } from 'react-mentions';
import { Mention, MentionsInput } from 'react-mentions';

import * as S from './styles';

type InputFieldWithMentionProps = {
	value: string;
	handleChange: (str: string) => void;
	onSubmit: () => void;
	mentionables: SuggestionDataItem[];
	trigger: string;
};

const InputFieldWithMention: React.FC<InputFieldWithMentionProps> = ({
	value,
	handleChange,
	onSubmit,
	mentionables,
	trigger,
}) => {
	return (
		<S.Form>
			<MentionsInput
				placeholder="Type your message.."
				value={value}
				onChange={({ target }) => handleChange(target.value)}
				className="inputField"
				ignoreAccents
				allowSuggestionsAboveCursor={true}
			>
				<Mention trigger={trigger} data={mentionables} className={'mention'} />
			</MentionsInput>
			<S.SendButton onClick={onSubmit}>Send</S.SendButton>
		</S.Form>
	);
};

export default InputFieldWithMention;
