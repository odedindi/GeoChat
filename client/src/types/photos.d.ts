interface UserPhoto {
	filepath: string;
	webviewPath?: string;
}

type UploadNewAvatar = { (): Promise<string> };
type UseUploadNewAvatar = {
	(): {
		uploadNewAvatar: UploadNewAvatar;
		newAvatar: UserPhoto | null;
	};
};
