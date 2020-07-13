import { SectionData } from "./Control";
import { PAGE_DATA } from "../Reader/ReaderActionsReducers";
import { PAGE_UPDATE, previousPage, nextPage } from "../ReaderControl/ReaderControlActionsReducers";
import { Dispatch } from "redux";

const SECTION_UPDATE = "SECTION_UPDATE";

const SECTION_STATE = "SECTION_STATE";

export const control = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const key = event.key;
		const state = getState();
		const section = state.section;
		const spanGroups = state.pageData.spanGroups;
		const pageNumber = state.pageNumber;
		const numPages = state.numPages;

		let newIndex;

		console.log(section, spanGroups);

		switch (key) {
			case "ArrowDown":
				if (spanGroups) {
					event.preventDefault();
					newIndex = section.curIndex + 1;
					if (newIndex === spanGroups.length) newIndex = 0;
					dispatch(sectionUpdate(section, newIndex));
				}
				break;
			case "ArrowUp":
				if (spanGroups) {
					event.preventDefault();
					newIndex = section.curIndex - 1;
					if (newIndex === -1) newIndex = spanGroups.length - 1;
					dispatch(sectionUpdate(section, newIndex));
				}
				break;
			case "ArrowLeft":
				event.preventDefault();
				dispatch(previousPage(pageNumber, numPages));
				break;
			case "ArrowRight":
				event.preventDefault();
				dispatch(nextPage(pageNumber, numPages));
			case " ":
				event.preventDefault();
				dispatch(sectionSelectionState());
				break;
		}
	};
};

//TODO: state per page

export type SectionSelectionState = "free" | "locked";

export const sectionSelectionState = () => {
	return (dispatch: Dispatch, getState: Function) => {
		const section = getState().section;
		dispatch({
			type: SECTION_STATE,
			section: { ...section, selectionState: section.selectionState === "free" ? "locked" : "free" },
		});
	};
};

export const sectionUpdate = (oldSection: SectionData, sectionIndex: number) => {
	return { type: SECTION_UPDATE, section: { ...oldSection, curIndex: sectionIndex } };
};

export const section = (
	state: SectionData = { curIndex: 0, updateAllowed: false, selectionState: "free" },
	{ type, section }: { type: string; section: SectionData }
): SectionData => {
	switch (type) {
		case SECTION_UPDATE:
			if (state.updateAllowed && state.selectionState === "free") return section;
			return state;
		case SECTION_STATE:
			return section;
		case PAGE_UPDATE:
			const disabledSectionData = { ...state, updateAllowed: false };
			return disabledSectionData;
		case PAGE_DATA:
			const resetedSectionData = { ...state, curIndex: 0, updateAllowed: true };
			return resetedSectionData;
		default:
			return state;
	}
};
