import * as t from "./actionTypes";
import selection from "../selection";
import { CreationType } from "../cards/model/model-config";
import { contextMenuContainsTargetNode } from "./services";

export const closeContextMenu = () => {
	return { type: t.CLOSE_CONTEXT_MENU };
};

export const openContextMenu = (position: { x: number; y: number }) => {
	return { type: t.OPEN_CONTEXT_MENU, payload: position };
};

export const mouseDownControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const clickOutSideOfMenu = !contextMenuContainsTargetNode(getState(), event);
		if (clickOutSideOfMenu) {
			dispatch(closeContextMenu());
		}
	};
};

export const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();

		if (!selection.selectors.sourceConfigExists(state)) return;

		event.preventDefault();

		dispatch(openContextMenu({ x: event.x, y: event.y }));
	};
};

export const dispatchCreationFromContextMenu = (creationType: CreationType, cardID?: string) => {
	return (dispatch: any) => {
		//TODO-RC: make this non thunk
		dispatch(closeContextMenu());
		dispatch(selection.actions.addSelectionGoal({ cardField: creationType, cardID, updateType: "REPLACE" }));
	};
};
