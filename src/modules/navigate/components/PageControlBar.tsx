import React from "react";
import { connect } from "react-redux";
import display from "../../display";

function PageControlBar({
	currentPage,
	totalPages,
	nextPage,
	previousPage,
}: {
	currentPage: number;
	totalPages: number | undefined;
	nextPage: (curPage: number, numbPages: number) => void;
	previousPage: (curPage: number, numbPages: number) => void;
}) {
	return totalPages ? (
		<div>
			<p>
				Page {currentPage} of {totalPages}
			</p>
			<button
				type="button"
				disabled={currentPage <= 1}
				onClick={() => {
					previousPage(currentPage, totalPages);
				}}
			>
				Previous
			</button>
			<button
				type="button"
				disabled={currentPage >= totalPages}
				onClick={() => {
					nextPage(currentPage, totalPages);
				}}
			>
				Next
			</button>
		</div>
	) : null;
}
export const PageControlBarContainer = connect(display.selectors.getPageControlData, {
	nextPage: display.actions.nextPage,
	previousPage: display.actions.previousPage,
})(PageControlBar);
