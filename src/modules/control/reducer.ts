import { ClayMemoryPayloadAction } from "../../shared/utils";
import * as t from "./actionTypes";
import { Model, undoableActions } from "./model";

const initialState: Model = {
	past: [],
	present: null,
	future: [],
};

//TODO: need to reset this sometime (same point as with redux-undo history)

const actionCombinations = [[]];
const combineActions = (actionHistory: string[][], action: string[]) => {
	// const curCombinations =
};

const control = (state = initialState, { type }: ClayMemoryPayloadAction): Model => {
	if (undoableActions.includes(type)) {
		// only keep full history up to 15
		let past = state.past.length === 15 ? state.past.slice(1) : state.past;
		return { past: state.present ? past.concat(state.present) : past, present: [type], future: [] };
	}
	let present;
	switch (type) {
		case t.UNDO_ACTION_HISTORY:
			present = state.past.length > 0 ? state.past[state.past.length - 1] : null;
			return {
				past: state.past.slice(0, state.past.length - 1),
				present,
				future: state.present ? [state.present, ...state.future] : state.future,
			};
		case t.REDO_ACTION_HISTORY:
			present = state.future.length > 0 ? state.future[0] : null;
			return {
				past: state.present ? [...state.past, state.present] : state.past,
				present,
				future: state.future.slice(1),
			};
		case t.REMOVE_ACTION_HISTORY:
			return initialState;
		default:
			return state;
	}
};

export default control;
