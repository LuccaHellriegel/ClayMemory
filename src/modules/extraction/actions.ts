import * as t from "./actionTypes";
import selection from "../selection";
import { CreationType } from "../cards/model/model-config";
import { contextMenuContainsTargetNode } from "./services";
import river from "../river";

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
			dispatch(river.actions.resetHoveredCard());
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
	return (dispatch: any, getState: Function) => {
		dispatch(closeContextMenu());
		console.log(cardID);
		dispatch(selection.actions.addSelectionGoal({ cardField: creationType, cardID, updateType: "REPLACE" }));

		// const state = getState();
		// // if this does exist, we dont need to provide an origin, because it will be provided by the sourceCard
		// const sourceCard = selection.selectors.getSourceCard(state);
		// // always overwrite origin, even if isUpdate, because updateType==replace

		// const origin: CardOrigin | undefined = sourceCard ? undefined : display.selectors.getCurrentOrigin(state);
		// dispatch(selection.services.use_selection.selectionToCardReplace(creationType, origin, cardID));
	};
};
