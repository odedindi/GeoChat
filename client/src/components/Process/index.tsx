import * as React from 'react';
import { useStore } from 'src/Store';

import * as S from './styles';

const Process: React.FC = () => {
	const { storeState } = useStore();

	return (
		<S.ProcessWapper>
			<S.SecretKey>
				Secret Key : <S.Code>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</S.Code>
			</S.SecretKey>
			<S.Incoming>
				<S.Title>Incoming Data</S.Title>
				<S.Content>{storeState.cypher}</S.Content>
			</S.Incoming>
			<S.Crypt>
				<S.Title>Decypted Data</S.Title>
				<S.Content>{storeState.text}</S.Content>
			</S.Crypt>
		</S.ProcessWapper>
	);
};
export default Process;
