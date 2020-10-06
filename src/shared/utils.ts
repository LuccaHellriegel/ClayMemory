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

export type ClayMemoryAction = { type: string };
export type ClayMemoryPayloadAction = { type: string; payload: any };
