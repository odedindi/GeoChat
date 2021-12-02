import type { ToggleChangeEventDetail } from '@ionic/core';
import {
	IonIcon,
	IonItem,
	IonLabel,
	IonPopover,
	IonToggle,
} from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';
import { isMobile } from 'react-device-detect';

const ToggleOption: React.FC<{
	id: keyof User;
	label: string;
	onChange: ({
		id,
		value,
	}: {
		id: keyof User;
		value: string | boolean;
	}) => void;
	state: boolean;
	tooltipContent?: string;
}> = ({ label, id, onChange, state, tooltipContent }) => {
	const [popoverState, setShowPopover] = React.useState(false);

	const onToggle = ({ detail }: CustomEvent<ToggleChangeEventDetail>) =>
		onChange({ id, value: detail.checked });

	return (
		<IonItem>
			<IonLabel>
				{label}
				{tooltipContent && (
					<span
						title={!isMobile ? tooltipContent : undefined}
						style={{ cursor: 'pointer' }}
						onClick={() => setShowPopover(true)}
					>
						<IonIcon
							slot="start"
							icon={I.informationCircleOutline}
							style={{ pointerEvents: 'none' }}
						/>
					</span>
				)}
			</IonLabel>
			<IonToggle slot="end" checked={state} onIonChange={onToggle} />
			{isMobile && (
				<IonPopover
					isOpen={popoverState}
					onDidDismiss={() => setShowPopover(false)}
				>
					{tooltipContent}
				</IonPopover>
			)}
		</IonItem>
	);
};

export default ToggleOption;
