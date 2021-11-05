import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export const useGallery = (): {
	prompt: () => Promise<string>;
} => {
	const prompt = async () => {
		const options = {
			resultType: CameraResultType.Uri,
			source: CameraSource.Prompt,
			quality: 100,
		};
		const cameraPhoto = await Camera.getPhoto(options);
		return Capacitor.convertFileSrc(cameraPhoto.webPath as string);
	};

	return {
		prompt,
	};
};
