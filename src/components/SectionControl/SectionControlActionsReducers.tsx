import { SectionData } from "./SectionControl";
import { PAGE_DATA } from "../Reader/ReaderActionsReducers";
import { PAGE_UPDATE } from "../ReaderControl/ReaderControlActionsReducers";

export const SECTION_UPDATE = "SECTION_UPDATE";

export const sectionUpdate = (oldSection: SectionData, sectionIndex: number) => {
	return { type: SECTION_UPDATE, section: { ...oldSection, curIndex: sectionIndex } };
};

export const section = (
	state: SectionData = { curIndex: 0, updateAllowed: false },
	{ type, section }: { type: string; section?: SectionData }
): SectionData => {
	switch (type) {
		case SECTION_UPDATE:
			if (state.updateAllowed && section) return section;
			return state;
		// disable during page update
		case PAGE_UPDATE:
			return { ...state, updateAllowed: false };
		// reset on new page-data
		case PAGE_DATA:
			return { ...state, curIndex: 0, updateAllowed: true };
		default:
			return state;
	}
};
