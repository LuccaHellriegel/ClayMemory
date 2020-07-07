import { connect } from "react-redux";
import { section, sectionUpdate } from "./SelectorActionsReducers";
import { useEventListener } from "../../useEventListener";

export type Section = { curIndex: number; maxIndex?: number };

function Selector({
	sectionChange,
	section,
}: {
	section: Section;
	sectionChange: (oldSection: Section, sectionIndex: number) => void;
}) {
	useEventListener("keydown", (event: KeyboardEvent) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			sectionChange(section, section.curIndex + 1);
		}
	});

	//TODO: listen to keydown
	// if (!section) {
	// 	// default section
	// 	sectionChange({ maxIndex });
	// }

	return null;
}

function mapStateToProps(state: any) {
	if (state.pageData) {
		return { section: state.section }; //, spanGroups: state.pageData.spanGroups };
	}
	return {};
}

export const SelectorContainer = connect(mapStateToProps, { sectionChange: sectionUpdate })(Selector);
