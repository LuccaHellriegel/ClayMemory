import { connect } from "react-redux";
import { sectionUpdate } from "./SectionControlActionsReducers";
import { useEventListener } from "../../hooks/useEventListener";

export type SectionData = { curIndex: number; updateAllowed: boolean };

function SectionControl({
	sectionUpdate,
	section,
	spanGroups,
}: {
	section: SectionData;
	sectionUpdate: (oldSection: SectionData, sectionIndex: number) => void;
	spanGroups: HTMLSpanElement[][];
}) {
	//TODO: WASD for making selection smaller

	useEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			let newIndex = section.curIndex + 1;
			if (newIndex === spanGroups.length) newIndex = 0;
			sectionUpdate(section, newIndex);
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			let newIndex = section.curIndex - 1;
			//TODO: Page-Focus needs to change too?
			if (newIndex === -1) newIndex = spanGroups.length - 1;
			sectionUpdate(section, newIndex);
		}
	});
	return null;
}

function mapStateToProps(state: any) {
	if (state.pageData.spanGroups) {
		return { section: state.section, spanGroups: state.pageData.spanGroups };
	}
	return {};
}

export const SectionControlContainer = connect(mapStateToProps, { sectionUpdate })(SectionControl);
