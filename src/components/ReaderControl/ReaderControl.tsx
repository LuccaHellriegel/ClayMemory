import React from "react";
import { connect } from "react-redux";
import { nextPage, previousPage } from "./ReaderControlActionsReducers";

function ReaderControl({
	pageNumber,
	numPages,
	nextPage,
	previousPage,
}: {
	pageNumber: number;
	numPages: number;
	nextPage: (curPage: number, numbPages: number) => void;
	previousPage: (curPage: number, numbPages: number) => void;
}) {
	return (
		<div>
			<p>
				Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
			</p>
			<button
				type="button"
				disabled={pageNumber <= 1}
				onClick={() => {
					previousPage(pageNumber, numPages);
				}}
			>
				Previous
			</button>
			<button
				type="button"
				disabled={pageNumber >= numPages}
				onClick={() => {
					nextPage(pageNumber, numPages);
				}}
			>
				Next
			</button>
		</div>
	);
}

function mapStateToProps(state: any) {
	return { pageNumber: state.page, numPages: state.numPages };
}

export const ReaderControlContainer = connect(mapStateToProps, { nextPage, previousPage })(ReaderControl);
