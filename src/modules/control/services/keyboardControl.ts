import { Dispatch } from "redux";
import { pageControl, sectionControl, selectionControl } from "./focus/selectionFocus";
import { contextMenuControl } from "./focus/sharedFocus";
import focus from "../../focus";

export const keyboardControl = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const userFocus = focus.selectors.getFocus(getState());
		switch (userFocus) {
			case "SELECTION":
				pageControl(event.key, event, dispatch);
				sectionControl(event.key, event, dispatch);
				selectionControl(event.key, event, dispatch);
				contextMenuControl(event.key, event, dispatch);
				break;
			case "CONTEXT_MENU":
				contextMenuControl(event.key, event, dispatch);
				break;
		}
	};
};
