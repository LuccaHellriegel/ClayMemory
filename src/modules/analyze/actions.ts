import { Dispatch } from "redux";
import { materialGroupData } from "./services/materialGroupData";
import * as t from "./actionTypes";
import { MaterialData } from "./model";
import { getTimeStamp, getWordSelectionGroups } from "./selectors";
import { RefObject } from "react";
import { incrementer } from "../../shared/utils";

export const tryInterval = (tries: number, ms: number, func: () => boolean) => {
	const increment = incrementer();
	const timeout = setInterval(() => {
		if (increment() > tries) {
			clearInterval(timeout);
			return;
		}

		if (func()) clearInterval(timeout);
	}, ms);
};

// text-layer is not really guaranteed to be rendered on render "success",
// so we use this ugly "try ten times" approach
export function captureMaterialData(documentRef: RefObject<any>) {
	return (dispatch: Dispatch, getState: Function) => {
		const state = getState();
		const container = documentRef.current;
		if (container) {
			// TODO: still possibility of race-condition,
			// maybe check on each section update if the number is congruent and if not actualize?
			// TODO: make fluid movement for changing from non-existing section on new page to existing one

			const startTime = Date.now();

			// try once before going into intervals (most times once should work)
			const curMaterialGroupData = materialGroupData(container as HTMLDivElement);
			if (curMaterialGroupData && getTimeStamp(state) < startTime) {
				const payload: MaterialData = {
					...curMaterialGroupData,
					materialDataTimeStamp: startTime,
				};
				dispatch({ type: t.MATERIAL_DATA, payload });
			} else {
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
