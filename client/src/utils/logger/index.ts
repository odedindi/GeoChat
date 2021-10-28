export const getLogger: (tag: string) => (...args: any) => void =
	(tag) =>
	(...args) =>
		console.log(tag, ...args);

export const withLogs: WithLogs = async (promise, fn) => {
	const log = getLogger('Client');
	log(`${fn} - started`);
	try {
		const res = await promise;
		log(`${fn} - succeeded`);
		return await Promise.resolve(res.data);
	} catch (err) {
		log(`${fn} - failed`);
		return await Promise.reject(err);
	}
};
