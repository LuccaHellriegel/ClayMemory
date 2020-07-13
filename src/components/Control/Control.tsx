import { connect } from "react-redux";
import { SectionSelectionState, control } from "./ControlActionsReducers";
import { useEventListener } from "../../hooks/useEventListener";

export type SectionData = { curIndex: number; updateAllowed: boolean; selectionState: SectionSelectionState };

function Control({ control }: { control: (event: KeyboardEvent) => void }) {
	useEventListener("keydown", control);
	return null;
}

export const ControlContainer = connect(() => {}, {
	control,
})(Control);
