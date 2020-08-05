import { getContextMenuRef, getContextMenuQARefs } from "./selectors";

// the root div for the menu invisibly covers the whole screen
// the actual div that is visible is this
const baseContextMenuSelector = "div.MuiPaper-root";

export const contextMenuContainsTargetNode = (state: any, event: Event) => {
	const menuRef = getContextMenuRef(state).current;

	// the nested items are rendered under a different menu
	// the current api does not allow access
	// so the qa-refs refer to the Q-button
	// we check the click against his parent,
	// which is the div that contains the Q and A buttons
	const qaRefs = getContextMenuQARefs(state)
		.map((refObject) => refObject.current)
		.filter((cur) => !!cur)
		.map((ref) => ref.parentNode);

	const target = event.target as Node;

	if (menuRef?.querySelector(baseContextMenuSelector)?.contains(target)) return true;

	for (const qaRef of qaRefs) {
		if (qaRef.contains(target)) return true;
	}

	return false;
};
