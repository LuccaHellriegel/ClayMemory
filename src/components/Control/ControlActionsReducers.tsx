import { SectionData } from "./Control";
import { PAGE_DATA } from "../Reader/ReaderActionsReducers";
import { PAGE_UPDATE } from "../ReaderControl/ReaderControlActionsReducers";

const SECTION_UPDATE = "SECTION_UPDATE";

export const sectionUpdate = (oldSection: SectionData, sectionIndex: number) => {
	return { type: SECTION_UPDATE, section: { ...oldSection, curIndex: sectionIndex } };
};

export const section = (
	state: SectionData = { curIndex: 0, updateAllowed: false },
	{ type, section }: { type: string; section: SectionData }
): SectionData => {
	switch (type) {
		case SECTION_UPDATE:
			if (state.updateAllowed) return section;
			return state;
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
