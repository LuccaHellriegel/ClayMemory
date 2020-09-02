import { FocusState, DisplayFocus } from "./model";
import * as t from "./actionTypes";

const initialState: FocusState = { displayFocus: "ACTIVE_RIVER" };

const focus = (state = initialState, { type, payload }: { type: string; payload: any }): FocusState => {
	switch (type) {
		case t.DISPLAY_FOCUS_UPDATE:
			return { ...state, displayFocus: payload as DisplayFocus };
		default:
			return state;
	}
};

export default focus;
