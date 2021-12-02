import type { RangeChangeEventDetail } from '@ionic/core';
import { IonItem, IonRange, IonIcon, IonLabel } from '@ionic/react';
import * as I from 'ionicons/icons';
import * as React from 'react';

const SelectPreferredRange: React.FC<{
	value: number;
	setValue: (event: CustomEvent<RangeChangeEventDetail>) => void;
}> = ({ value, setValue }) => {
	return (
		<IonItem lines="full">
			<IonLabel slot="start">Set Your Preferred Range (km)</IonLabel>
			<IonRange
				pin={true}
				snaps={true}
				min={40}
				max={200}
				step={10}
				value={value}
				onIonChange={setValue}
			>
				<IonIcon size="small" slot="start" icon={I.ellipseOutline} />
				<IonIcon slot="end" size="large" icon={I.ellipseOutline} />
			</IonRange>
		</IonItem>
	);
};

export default SelectPreferredRange;
