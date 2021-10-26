import * as React from 'react';

type ReturnVoid = { (): void };
type ReturnPromise = { (): Promise<void> };

export const useKeyboardListener = (fn: ReturnVoid | ReturnPromise): void => {
	React.useEffect(() => {
		const keyboardListener = ({ code }: KeyboardEvent) => {
			if (code === 'Enter' || code === 'NumpadEnter') fn();
		};
		document.addEventListener('keydown', keyboardListener);
		return () => {
			document.removeEventListener('keydown', keyboardListener);
		};
	}, [fn]);
};
