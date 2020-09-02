import * as t from "./actionTypes";
import { DisplayFocus } from "./model";

export const updateDisplayFocus = (focus: DisplayFocus) => {
	return { type: t.DISPLAY_FOCUS_UPDATE, payload: focus };
};
