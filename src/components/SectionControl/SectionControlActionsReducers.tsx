import { Section } from "./SectionControl";

export const SECTION_UPDATE = "SECTION_UPDATE";

export const sectionUpdate = (oldSection: Section, sectionIndex: number) => {
	return { type: SECTION_UPDATE, section: { ...oldSection, curIndex: sectionIndex } };
};

export const section = (state: Section = { curIndex: 0 }, { type, section }: { type: string; section?: Section }) => {
	switch (type) {
		case SECTION_UPDATE:
			return section;
		default:
			return state;
	}
};
