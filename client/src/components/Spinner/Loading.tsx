import { IonLoading } from '@ionic/react';

const Loading: React.FC<{ open: boolean }> = ({ open }) => (
	<IonLoading isOpen={open} message={'Loading...'} />
);

export default Loading;
