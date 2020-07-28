import { Dispatch } from "redux";
import { tryInterval } from "../../../shared/utils";
import { materialGroupData } from "./services/SpanService";
import * as t from "./actionTypes";
import { MaterialData } from "./model";
import { getTimeStamp, getWordSelectionGroups } from "./selectors";

// from MutationObserver experiments,
// we know that the text-layer is not guaranteed to be rendered on render "success",
// so we use this ugly "try ten times" approach
export function captureMaterialData() {
	return (dispatch: Dispatch, getState: Function) => {
		const container = document.querySelector("div.react-pdf__Document");
		if (container) {
			// TODO: still possibility of race-condition,
			// maybe check on each section update if the number is congruent and if not actualize?
			// TODO: make fluid movement for changing from non-existing section on new page to existing one

			const startTime = Date.now();
			tryInterval(10, 20, () => {
				const curMaterialGroupData = materialGroupData(container as HTMLDivElement);
				if (curMaterialGroupData && getTimeStamp(getState()) < startTime) {
					const payload: MaterialData = {
						...curMaterialGroupData,
						materialDataTimeStamp: startTime,
					};
					dispatch({ type: t.MATERIAL_DATA, payload });
					return true;
				}
				return false;
			});
		}
	};
}

export const updateSelectionGroup = (updatedSelectionGroup: (1 | 0)[][], sectionIndex: number) => {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const newSelectionGroups = [...getWordSelectionGroups(state)];
		newSelectionGroups[sectionIndex] = updatedSelectionGroup;
		dispatch({ type: t.SELECTION_UPDATE, payload: newSelectionGroups });
	};
};