import { ControlData, ControlFocus } from "./model";
import * as t from "./actionTypes";

const initialState: ControlData = { focus: "SELECTION" };

const controlData = (state = initialState, { type, payload }: { type: string; payload: any }): ControlData => {
	switch (type) {
		case t.FOCUS_UPDATE:
			return { ...state, focus: payload as ControlFocus };
		default:
			return state;
	}
};

export default controlData;
