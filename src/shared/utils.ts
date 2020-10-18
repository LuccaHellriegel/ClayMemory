import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
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

export type Filter = (element: any) => boolean;
export const combineFilterArr = (filters: Filter[]) => (x: any) => filters.reduce((b, f) => b || f(x), false);

export type AnyPayloadCaseReducer = CaseReducer<any, PayloadAction<any>>;
export const simpleReducer = (field: string): AnyPayloadCaseReducer => (state: any, { payload }: any) => {
	return { ...state, [field]: payload };
};

export const simpleReducerMap = (fields: string[]) => {
	const map: { [key: string]: AnyPayloadCaseReducer } = {};
	for (let field of fields) {
		map[field] = simpleReducer(field);
	}
	return map;
};
