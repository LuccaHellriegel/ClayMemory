import { toggleContextMenuFocus } from "../../actions";
import creation from "../../../creation";

export const contextMenuControl = (key: string, event: KeyboardEvent, dispatch: any) => {
	switch (key) {
		case "t":
			event.preventDefault();
			dispatch(creation.actions.toggleContextMenu());
			dispatch(toggleContextMenuFocus());
			//dispatch(sectionSelectionState(section));
			//dispatch(cardRiverUpdate(0, cardRiverState, { type: "Note", content: "Test" }));
			break;
	}
};
