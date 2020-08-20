import { Dispatch } from "redux";
import focus from "../../focus";
import display from "../../display";
import creation from "../../creation";
import { UserFocus } from "../../focus/model";

type KeyActionMap = { [key: string]: any };

type KeyEventDispatcher = (event: KeyboardEvent, dispatch: any, state?: any) => void;

const keyEventDispatcher = (keyMap: KeyActionMap) => (event: KeyboardEvent, dispatch: any) => {
	const action = keyMap[event.key];
	if (action) {
		event.preventDefault();
		dispatch(action);
	}
};

const pageControlKeyMap: KeyActionMap = {
	ArrowLeft: display.actions.previousPage(),
	ArrowRight: display.actions.nextPage(),
};

const pageControlDispatcher = keyEventDispatcher(pageControlKeyMap);

const contextMenuControlKeyMap: KeyActionMap = {
	t: creation.actions.toggleContextMenu(),
};

const contextMenuControlDispatcher = keyEventDispatcher(contextMenuControlKeyMap);

const documentFocusKeyMap = {
	...pageControlKeyMap,
	...contextMenuControlKeyMap,
};

const documentFocusDispatcher = keyEventDispatcher(documentFocusKeyMap);

const doNothing = (event: any, dispatch: any) => {};

const focusDispatcherMap: { [focus in UserFocus]: KeyEventDispatcher } = {
	DOCUMENT: documentFocusDispatcher,
	CONTEXT_MENU: contextMenuControlDispatcher,
	RIVER: doNothing,
	RIVER_CONTROL: doNothing,
	CONTROL: pageControlDispatcher,
};

export const keyDownControl = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const state = getState();
		const userFocus = focus.selectors.getFocus(state);
		const dispatcher = focusDispatcherMap[userFocus];

		dispatcher(event, dispatch, state);
	};
};
