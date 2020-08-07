import { Dispatch } from "redux";
import focus from "../../focus";
import display from "../../display";
import select from "../../select";
import creation from "../../creation";
import { UserFocus } from "../../focus/model";

type KeyActionMap = { [key: string]: any };

const pageControlKeyMap: KeyActionMap = {
	ArrowLeft: display.actions.previousPage(),
	ArrowRight: display.actions.nextPage(),
};

type KeyEventDispatcher = (event: KeyboardEvent, dispatch: any) => void;

const keyEventDispatcher = (keyMap: KeyActionMap) => (event: KeyboardEvent, dispatch: any) => {
	const action = keyMap[event.key];
	if (action) {
		event.preventDefault();
		dispatch(action);
	}
};

const sectionControlKeyMap: KeyActionMap = {
	ArrowDown: select.actions.updateSection("DOWN"),
	ArrowUp: select.actions.updateSection("UP"),
	" ": select.actions.toggleSectionMovementState(),
};

const selectionControlKeyMap: KeyActionMap = {
	a: select.actions.updateSelection("PLUS_WORD"),
	d: select.actions.updateSelection("MINUS_WORD"),
	w: select.actions.updateSelection("PLUS_SPAN"),
	s: select.actions.updateSelection("MINUS_SPAN"),
};

const contextMenuControlKeyMap: KeyActionMap = {
	t: creation.actions.toggleContextMenu(),
};

const selectionFocusKeyMap = {
	...pageControlKeyMap,
	...sectionControlKeyMap,
	...selectionControlKeyMap,
	...contextMenuControlKeyMap,
};
const selectionFocusDispatcher = keyEventDispatcher(selectionFocusKeyMap);

const contextMenuFocusKeyMap = { ...contextMenuControlKeyMap };
const contextMenuFocusDispatcher = keyEventDispatcher(contextMenuFocusKeyMap);

const focusDispatcherMap: { [focus in UserFocus]: KeyEventDispatcher } = {
	SELECTION: selectionFocusDispatcher,
	CONTEXT_MENU: contextMenuFocusDispatcher,
	EDITOR: (event, dispatch) => {},
};

export const keyboardControl = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const userFocus = focus.selectors.getFocus(getState());
		const dispatcher = focusDispatcherMap[userFocus];

		dispatcher(event, dispatch);
	};
};
