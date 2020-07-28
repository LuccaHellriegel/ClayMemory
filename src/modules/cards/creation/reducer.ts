import * as t from "./actionTypes";

const creationData = (state = false, { type }: { type: string }) => {
	switch (type) {
		case t.TOGGLE_CONTEXT_MENU:
			return !state;
		default:
			return state;
	}
};

export default creationData;
