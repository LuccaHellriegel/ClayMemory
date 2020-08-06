import creation from "../../../creation";
import focus from "../../../focus";

export const contextMenuControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "t":
			event.preventDefault();
			dispatch(creation.actions.toggleContextMenu());
			dispatch(focus.actions.toggleContextMenuFocus());
			break;
	}
};
