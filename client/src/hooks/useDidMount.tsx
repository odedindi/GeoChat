import * as React from 'react';

type UseDidMount = { (): { didMount: boolean } };

export const useDidMount: UseDidMount = () => {
	const [didMount, setDidMount] = React.useState(false);
	React.useEffect(() => {
		setDidMount(true);

		return () => {
			setDidMount(false);
		};
	}, []);

	return { didMount };
};

export default useDidMount;
