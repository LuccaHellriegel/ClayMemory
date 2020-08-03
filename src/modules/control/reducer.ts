import { ControlData, ControlFocus } from "./model";
import * as t from "./actionTypes";
import creation from "../creation";

const initialState: ControlData = { focus: "SELECTION" };

const controlData = (state = initialState, { type, payload }: { type: string; payload: any }): ControlData => {
	switch (type) {
		case t.FOCUS_UPDATE:
			return { ...state, focus: payload as ControlFocus };
		case creation.actionTypes.CLOSE_CONTEXT_MENU:
			const notClosedByControl = state.focus === "CONTEXT_MENU";
			if (notClosedByControl) return { ...state, focus: "SELECTION" };
		default:
			return state;
	}
};

export default controlData;
