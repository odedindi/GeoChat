import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import * as React from 'react';

const useUploadNewAvatar: UseUploadNewAvatar = () => {
	const [newAvatar, setNewAvatar] = React.useState<UserPhoto | null>(null);

	const uploadNewAvatar: UploadNewAvatar = async () => {
		try {
			const cameraPhoto = await Camera.getPhoto({
				resultType: CameraResultType.Uri,
				source: CameraSource.Camera,
				quality: 100,
			});

			const fileName = new Date().getTime() + '.jpeg';
			setNewAvatar({
				filepath: fileName,
				webviewPath: cameraPhoto.webPath,
			});
			return Capacitor.convertFileSrc(cameraPhoto.webPath as string);
		} catch (err) {
			console.error(err);
			return Capacitor.convertFileSrc('');
		}
	};

	return { newAvatar, uploadNewAvatar };
};

export default useUploadNewAvatar;
