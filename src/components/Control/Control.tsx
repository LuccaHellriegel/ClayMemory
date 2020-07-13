import { connect } from "react-redux";
import { sectionUpdate } from "./ControlActionsReducers";
import { useEventListener } from "../../hooks/useEventListener";
import { nextPage, previousPage } from "../ReaderControl/ReaderControlActionsReducers";

export type SectionData = { curIndex: number; updateAllowed: boolean };

function Control({
	sectionUpdate,
	previousPage,
	nextPage,
	section,
	spanGroups,
	pageNumber,
	numPages,
}: {
	section: SectionData;
	sectionUpdate: (oldSection: SectionData, sectionIndex: number) => void;
	nextPage: (curPage: number, numbPages: number) => void;
	previousPage: (curPage: number, numbPages: number) => void;
	spanGroups: HTMLSpanElement[][];
	pageNumber: number;
	numPages: number;
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

		if (event.key === "ArrowLeft") {
			event.preventDefault();
			previousPage(pageNumber, numPages);
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			nextPage(pageNumber, numPages);
		}
	});

	return null;
}

function mapStateToProps(state: any) {
	if (state.pageData.spanGroups) {
		return {
			section: state.section,
			spanGroups: state.pageData.spanGroups,
			pageNumber: state.page,
			numPages: state.numPages,
		};
	}
	return {};
}

export const ControlContainer = connect(mapStateToProps, { sectionUpdate, previousPage, nextPage })(Control);
