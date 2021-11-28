import { IonToast } from '@ionic/react';
import * as React from 'react';

type UseToast = {
	(): {
		Toast: React.FC;
		raiseToast: (msg: string) => void;
	};
};
const useToast: UseToast = () => {
	const [toastState, setToastState] = React.useState({
		show: false,
		msg: '',
	});
	const raiseToast = (msg: string) => setToastState({ show: true, msg });

	const Toast: React.FC = () => (
		<IonToast
			isOpen={toastState.show}
			message={toastState.msg}
			duration={10000}
			position="top"
			keyboardClose={true}
			onDidDismiss={() => setToastState((prev) => ({ ...prev, show: false }))}
			buttons={[
				{
					text: 'X',
					role: 'cancel',
				},
			]}
			color="warning"
		/>
	);

	return { Toast, raiseToast };
};

export default useToast;
