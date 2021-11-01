import type { GetResult } from '@capacitor/storage';
import { Storage } from '@capacitor/storage';
import { getLogger } from 'src/utils/logger';

const log = getLogger('useStorage');

type UseStorage = {
	(): {
		storage: {
			setItem: (key: string, value: string) => Promise<void>;
			getItem: (key: string) => Promise<GetResult>;
			removeItem: (key: string) => Promise<void>;
		};
	};
};

const useStorage: UseStorage = () => {
	const setItem = async (key: string, value: string) => {
		log(`setItem: ${key}`);
		return await Storage.set({ key: key, value: value });
	};

	const getItem = async (key: string) => {
		log(`getItem: ${key}`);
		return await Storage.get({ key: key });
	};

	const removeItem = async (key: string) => {
		log(`removeItem: ${key}`);
		return await Storage.remove({ key: key });
	};
	const storage = { setItem, getItem, removeItem };
	return { storage };
};

export default useStorage;
