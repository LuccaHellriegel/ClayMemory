import { KeyboardEvent } from "react";

export const incrementer = () => {
	let counter = 0;
	return () => {
		const curCounter = counter;
		counter++;
		return curCounter;
	};
};

export type KeyActionMap = { [key: string]: any };

type KeyEventDispatcher = (event: KeyboardEvent<Element>, dispatch: any, state?: any) => void;

export const keyEventDispatcherCreator = (keyMap: KeyActionMap): KeyEventDispatcher => (
	event: KeyboardEvent,
	dispatch: any
) => {
	const action = keyMap[event.key];
	if (action) {
		event.preventDefault();
		dispatch(action);
	}
};

export function partition(array: Array<any>, filter: (val: any) => boolean) {
	let pass: any[] = [],
		fail: any[] = [];
	array.forEach((e) => (filter(e) ? pass : fail).push(e));
	return [pass, fail];
}

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
