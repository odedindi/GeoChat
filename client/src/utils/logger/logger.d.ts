interface ResponseProps<T> {
	data: T;
}

type WithLogs = {
	<T>(promise: Promise<ResponseProps<T>>, fn: string): Promise<T>;
};
