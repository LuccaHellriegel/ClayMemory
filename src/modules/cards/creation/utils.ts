import { getContextMenuRef } from "./selectors";

// testing it this way is necessary, because the root div for the menu covers the whole screen,
// so simple checks dont work
export const actualContextMenuSelectorString =
	"div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded";

export const contextMenuContainsTargetNode = (state: any, event: Event) => {
	return !!getContextMenuRef(state)
		.current?.querySelector(actualContextMenuSelectorString)
		?.contains(event.target as Node);
};
