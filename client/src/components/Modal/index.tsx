/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAnimation, IonButton, IonModal } from '@ionic/react';

type ModalProps = {
	open: boolean;
	closeHandler: () => void;
};
const Modal: React.FC<ModalProps> = ({ children, closeHandler, open }) => {
	const enterAnimation = (baseEl: any) => {
		const backdropAnimation = createAnimation()
			.addElement(baseEl.querySelector('ion-backdrop')!)
			.fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

		const wrapperAnimation = createAnimation()
			.addElement(baseEl.querySelector('.modal-wrapper')!)
			.keyframes([
				{ offset: 0, opacity: '0', transform: 'scale(0)' },
				{ offset: 1, opacity: '0.99', transform: 'scale(1)' },
			]);

		return createAnimation()
			.addElement(baseEl)
			.easing('ease-out')
			.duration(500)
			.addAnimation([backdropAnimation, wrapperAnimation]);
	};

	const leaveAnimation = (baseEl: any) => {
		return enterAnimation(baseEl).direction('reverse');
	};

	return (
		<IonModal
			isOpen={open}
			enterAnimation={enterAnimation}
			leaveAnimation={leaveAnimation}
		>
			{children}
			<IonButton onClick={closeHandler}>EXIT</IonButton>
		</IonModal>
	);
};

export default Modal;
