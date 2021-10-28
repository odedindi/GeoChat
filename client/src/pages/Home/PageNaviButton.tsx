import { IonButton, IonCol } from '@ionic/react';

type PageNaviButtonProps = {
	clickHandler: () => void;
	title: string;
};
const PageNaviButton: React.FC<PageNaviButtonProps> = ({
	clickHandler,
	title,
}) => (
	<IonCol size="2">
		<IonButton onClick={clickHandler} size="small">
			{title}
		</IonButton>
	</IonCol>
);
export default PageNaviButton;
