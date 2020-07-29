import { Dispatch } from "redux";
import creation from "../../cards/creation";

export const mouseControl = (event: MouseEvent) => {
	return (dispatch: Dispatch, getState: Function) => {
		const clickOutSideOfMenu = !creation.utils.contextMenuContainsTargetNode(getState(), event);

		if (clickOutSideOfMenu) {
			dispatch(creation.actions.closeContextMenu());
		}
	};
};
