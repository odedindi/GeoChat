import * as React from 'react';

type ReturnVoid = { (): void };
type ReturnPromise = { (): Promise<void> };
type BtnCode = string;

export const useKeyboardListener = (
	fn: ReturnVoid | ReturnPromise,
	btnCode: BtnCode,
	withCtrlKey?: string,
): void => {
	React.useEffect(() => {
		const keyboardListener = ({ code, ctrlKey }: KeyboardEvent) => {
			if (withCtrlKey) {
				if (ctrlKey && code === btnCode) {
					fn();
				}
			} else if (code === btnCode) fn();
		};
		document.addEventListener('keydown', keyboardListener);
		return () => {
			document.removeEventListener('keydown', keyboardListener);
		};
	}, [btnCode, fn, withCtrlKey]);
};

export default useKeyboardListener;
