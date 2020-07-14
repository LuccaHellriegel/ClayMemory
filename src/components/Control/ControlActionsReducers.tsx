import { PAGE_DATA, PageDataType } from "../Reader/ReaderActionsReducers";
import { PAGE_UPDATE, previousPage, nextPage } from "../ReaderControl/ReaderControlActionsReducers";
import { Dispatch } from "redux";
import { updateSelectionGroup } from "./updateSelectionGroup";
import { cardRiverUpdate } from "../CardRiver/CardRiverActionsReducers";

//TODO: prerender next few pages?

//TODO: state per page

export type SectionData = { curIndex: number; updateAllowed: boolean; selectionState: SectionSelectionState };

export type SectionSelectionState = "free" | "locked";

const SECTION_UPDATE = "SECTION_UPDATE";

const SECTION_STATE = "SECTION_STATE";

export const keyboardControl = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const key = event.key;
		const { section, page, numPages, pageData, cardRiverState } = getState();
		const spanGroups = pageData.spanGroups;

		let newIndex;
		let updatedSelectionGroup;

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

				dispatch(previousPage(page, numPages));
				break;
			case "ArrowRight":
				event.preventDefault();
				dispatch(nextPage(page, numPages));
				break;
			case " ":
				event.preventDefault();
				dispatch(sectionSelectionState(section));
				break;
			case "a":
				event.preventDefault();

				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"PLUS_WORD"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "d":
				event.preventDefault();

				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"MINUS_WORD"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "w":
				event.preventDefault();

				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"PLUS_SPAN"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "s":
				event.preventDefault();

				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"MINUS_SPAN"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "Enter":
				event.preventDefault();

				dispatch(cardRiverUpdate(0, cardRiverState, { type: "Note", content: "Test" }));
				break;
		}
	};
};

export type SelectionUpdateType = "MINUS_WORD" | "PLUS_WORD" | "MINUS_SPAN" | "PLUS_SPAN";

export const SELECTION_UPDATE = "SELECTION_UPDATE";

export const selectionUpdate = (groupIndex: number, updatedSelectionGroup: (1 | 0)[][], pageData: PageDataType) => {
	const newSelectionGroups = [...pageData.selectionGroups];
	newSelectionGroups[groupIndex] = updatedSelectionGroup;
	return { type: SELECTION_UPDATE, pageData: { ...pageData, selectionGroups: newSelectionGroups } };
};

const sectionSelectionState = (section: SectionData) => {
	return {
		type: SECTION_STATE,
		section: { ...section, selectionState: section.selectionState === "free" ? "locked" : "free" },
	};
};

const sectionUpdate = (oldSection: SectionData, sectionIndex: number) => {
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
