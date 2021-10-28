import { IonButton } from '@ionic/react';

type PageNaviButtonProps = {
	clickHandler: () => void;
	title: string;
};
const PageNaviButton: React.FC<PageNaviButtonProps> = ({
	clickHandler,
	title,
}) => (
	<IonButton onClick={clickHandler} size="small">
		{title}
	</IonButton>
);
export default PageNaviButton;
