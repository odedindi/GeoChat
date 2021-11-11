import log from 'src/config/logger';

const dbQueryErr = (fnName: string, err: Error) => {
	log.error(`db queries ${fnName} error: ${err}`);
	throw err;
};

export default dbQueryErr;
