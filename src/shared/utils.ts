export const incrementer = () => {
	let counter = 0;
	return () => {
		const curCounter = counter;
		counter++;
		return curCounter;
	};
};

export const tryInterval = (tries: number, ms: number, func: () => boolean) => {
	const increment = incrementer();
	const timeout = setInterval(() => {
		if (increment() > tries) {
			clearInterval(timeout);
			return;
		}

		if (func()) clearInterval(timeout);
	}, ms);
};
