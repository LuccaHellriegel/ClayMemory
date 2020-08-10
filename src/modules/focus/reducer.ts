import { FocusState, UserFocus } from "./model";
import * as t from "./actionTypes";

const initialState: FocusState = { focus: "CONTROL" };

const focus = (state = initialState, { type, payload }: { type: string; payload: any }): FocusState => {
	switch (type) {
		case t.FOCUS_UPDATE:
			return { ...state, focus: payload as UserFocus };
		default:
			return state;
	}
};

export default focus;
