import { PAGE_DATA, PageDataType } from "../Reader/ReaderActionsReducers";
import { PAGE_UPDATE, previousPage, nextPage } from "../ReaderControl/ReaderControlActionsReducers";
import { Dispatch } from "redux";

//TODO: prerender next few pages?

//TODO: state per page

export type SectionData = { curIndex: number; updateAllowed: boolean; selectionState: SectionSelectionState };

export type SectionSelectionState = "free" | "locked";

const SECTION_UPDATE = "SECTION_UPDATE";

const SECTION_STATE = "SECTION_STATE";

export const keyboardControl = (event: KeyboardEvent) => {
	return (dispatch: Dispatch | any, getState: Function) => {
		const key = event.key;
		const { section, pageNumber, numPages, pageData } = getState();
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
				dispatch(previousPage(pageNumber, numPages));
				break;
			case "ArrowRight":
				event.preventDefault();
				dispatch(nextPage(pageNumber, numPages));
				break;
			case " ":
				event.preventDefault();
				dispatch(sectionSelectionState(section));
				break;
			case "a":
				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"PLUS_WORD"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "d":
				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"MINUS_WORD"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "w":
				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"PLUS_SPAN"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
			case "s":
				updatedSelectionGroup = updateSelectionGroup(
					(pageData as PageDataType).selectionGroups[section.curIndex],
					"MINUS_SPAN"
				);
				if (updatedSelectionGroup) dispatch(selectionUpdate(section.curIndex, updatedSelectionGroup, pageData));
				break;
		}
	};
};

type SelectionUpdateType = "MINUS_WORD" | "PLUS_WORD" | "MINUS_SPAN" | "PLUS_SPAN";

export const SELECTION_UPDATE = "SELECTION_UPDATE";

export const selectionUpdate = (groupIndex: number, updatedSelectionGroup: (1 | 0)[][], pageData: PageDataType) => {
	const newSelectionGroups = [...pageData.selectionGroups];
	newSelectionGroups[groupIndex] = updatedSelectionGroup;
	return { type: SELECTION_UPDATE, pageData: { ...pageData, selectionGroups: newSelectionGroups } };
};

export const updateSelectionGroup = (selectionGroup: (1 | 0)[][], type: SelectionUpdateType) => {
	let foundSpan = false;
	const newSelectionGroup = [];

	switch (type) {
		case "MINUS_WORD":
			for (let index = 0; index < selectionGroup.length; index++) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const oneIndex = spanGroup.indexOf(1);
					if (oneIndex !== -1) {
						foundSpan = true;
						spanGroup = [...spanGroup];
						spanGroup[oneIndex] = 0;
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup;
			break;
		case "PLUS_WORD":
			for (let index = selectionGroup.length - 1; index >= 0; index--) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const zeroIndex = spanGroup.lastIndexOf(0);
					if (zeroIndex !== -1) {
						foundSpan = true;
						spanGroup = [...spanGroup];
						spanGroup[zeroIndex] = 1;
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup.reverse();
			break;
		case "MINUS_SPAN":
			for (let index = 0; index < selectionGroup.length; index++) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const oneIndex = spanGroup.indexOf(1);
					if (oneIndex !== -1) {
						foundSpan = true;
						spanGroup = spanGroup.map((_) => 0);
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup;
			break;
		case "PLUS_SPAN":
			for (let index = selectionGroup.length - 1; index >= 0; index--) {
				let spanGroup = selectionGroup[index];
				if (!foundSpan) {
					const zeroIndex = spanGroup.lastIndexOf(0);
					if (zeroIndex !== -1) {
						foundSpan = true;
						spanGroup = spanGroup.map((_) => 1);
					}
				}
				newSelectionGroup.push(spanGroup);
			}
			if (foundSpan) return newSelectionGroup.reverse();
			break;
	}

	return null;
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
