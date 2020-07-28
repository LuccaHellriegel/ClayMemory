import { Dispatch } from "redux";
import cards from "../../cards";

export const mouseControl = (event: MouseEvent) => {
	return (dispatch: Dispatch, getState: Function) => {
		const clickOutSideOfMenu = !cards.creation.utils.contextMenuContainsTargetNode(getState(), event);

		if (clickOutSideOfMenu) {
			dispatch(cards.creation.actions.closeContextMenu());
		}
	};
};
