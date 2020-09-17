import { getContextMenuRef } from "../selectors";

// the root div for the menu invisibly covers the whole screen
// the actual div that is visible is this
const baseContextMenuSelector = "div.MuiPaper-root";

export const contextMenuContainsTargetNode = (state: any, event: Event) => {
	const menuRef = getContextMenuRef(state).current;
	const target = event.target as Node;

	if (menuRef?.querySelector(baseContextMenuSelector)?.contains(target)) return true;

	return false;
};
