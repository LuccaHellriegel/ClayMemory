import { connect } from "react-redux";
import { sectionUpdate } from "./SectionControlActionsReducers";
import { useEventListener } from "../../useEventListener";

export type SectionData = { curIndex: number; updateAllowed: boolean };

function SectionControl({
	sectionChange,
	section,
	spanGroups,
}: {
	section: SectionData;
	sectionChange: (oldSection: SectionData, sectionIndex: number) => void;
	spanGroups: HTMLSpanElement[][];
}) {
	useEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			let newIndex = section.curIndex + 1;
			if (newIndex === spanGroups.length) newIndex = 0;
			sectionChange(section, newIndex);
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			let newIndex = section.curIndex - 1;
			//TODO: Page-Focus needs to change too?
			if (newIndex === -1) newIndex = spanGroups.length - 1;
			sectionChange(section, newIndex);
		}
	});
	return null;
}

function mapStateToProps(state: any) {
	console.log(state.pageData);
	if (state.pageData.spanGroups) {
		return { section: state.section, spanGroups: state.pageData.spanGroups };
	}
	return {};
}

export const SectionControlContainer = connect(mapStateToProps, { sectionChange: sectionUpdate })(SectionControl);
