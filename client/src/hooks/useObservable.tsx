import * as React from 'react';
import type { Observable, Subscription } from 'rxjs';

type UseObservable = <T>(
	observable: Observable<T>,
	setter: React.Dispatch<React.SetStateAction<T[]>>,
) => void;

const useObservable: UseObservable = (observable, setter) => {
	React.useEffect(() => {
		const subscription: Subscription = observable.subscribe((result) => {
			setter((prev) => {
				if (!prev.includes(result)) return [...prev, result];
				return prev;
			});
		});
		return () => subscription.unsubscribe();
	}, [observable, setter]);
};

export default useObservable;
