import { IonToast } from '@ionic/react';
import * as React from 'react';

type UseToast = {
	(): {
		Toast: React.FC;
		toastHandler: (msg: string) => void;
	};
};
const useToast: UseToast = () => {
	const [toastState, setToastState] = React.useState({
		show: false,
		msg: '',
	});
	const toastHandler = (msg: string) => setToastState({ show: true, msg });

	const Toast: React.FC = () => (
		<IonToast
			isOpen={toastState.show}
			onDidDismiss={() => setToastState({ show: false, msg: '' })}
			message={toastState.msg}
			duration={2500}
		/>
	);

	return { Toast, toastHandler };
};

export default useToast;
