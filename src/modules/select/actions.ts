import * as t from "./actionTypes";
import { Dispatch } from "redux";
import { getSectionMovementState, getUpdateAllowed, getSectionIndex } from "./selectors";
import { SectionUpdateType, SelectionUpdateType } from "./model";
import analyze from "../analyze";
import { updateSelectionGroup } from "./services/updateSelectionGroup";

export const updateSelection = (type: SelectionUpdateType) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();
		if (getUpdateAllowed(state)) {
			const selectionGroups = analyze.selectors.getWordSelectionGroups(state);
			const sectionIndex = getSectionIndex(state);
			const updatedSelectionGroup = updateSelectionGroup(selectionGroups[sectionIndex], type);
			if (updatedSelectionGroup) dispatch(analyze.actions.updateSelectionGroup(updatedSelectionGroup, sectionIndex));
		}
	};
};

export const toggleSectionMovementState = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		if (getUpdateAllowed(state)) dispatch({ type: t.SECTION_STATE });
	};
};

export const updateSection = (updateType: SectionUpdateType) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		if (getUpdateAllowed(state) && getSectionMovementState(state) === "FREE") {
			let sectionIndex;
			const lastIndex = getSectionIndex(state);
			const spanGroups = analyze.selectors.getMaterialSpanGroups(state);
			switch (updateType) {
				case "UP":
					sectionIndex = lastIndex - 1;
					if (sectionIndex === -1) sectionIndex = spanGroups.length - 1;
					dispatch({ type: t.SECTION_UPDATE, payload: sectionIndex });
					return;
				case "DOWN":
					sectionIndex = lastIndex + 1;
					if (sectionIndex === spanGroups.length) sectionIndex = 0;
					dispatch({ type: t.SECTION_UPDATE, payload: sectionIndex });
					return;
			}
		}
	};
};
