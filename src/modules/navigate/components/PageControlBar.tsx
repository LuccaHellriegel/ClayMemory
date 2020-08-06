import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import display from "../../display";
import { AppBar, Toolbar, IconButton, Typography, TextField } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const nonDigitRegEx = /(\D)/;

export const validatePageChoice = (possiblePage: string, totalPages: number) => {
	if (possiblePage === "" || possiblePage.trim().match(nonDigitRegEx) !== null) return false;

	const asInt = parseInt(possiblePage);
	if (asInt < 1 || totalPages < asInt) return false;

	return true;
};

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
	const dispatch = useDispatch();
	const [state, setState] = useState({
		error: false,
		value: currentPage.toString(),
		userInput: currentPage.toString(),
	});

	// with this we can trigger a re-render onChange,
	// while making sure that if a new currentPage arrives, we reset the component
	if (state.value !== currentPage.toString()) {
		setState({ error: false, value: currentPage.toString(), userInput: currentPage.toString() });
	}

	return totalPages ? (
		<AppBar position="static">
			<Toolbar variant="dense">
				<Typography variant="h6">
					<TextField
						type="text"
						variant="filled"
						value={state.userInput}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								const submittedValue = (event.target as HTMLFormElement).value;
								if (!state.error) {
									dispatch(display.actions.setPage(parseInt(submittedValue)));
								}
							}
						}}
						onChange={(event) => {
							const submittedValue = (event.target as HTMLTextAreaElement).value;
							if (validatePageChoice(submittedValue, totalPages)) {
								setState({ ...state, error: false, userInput: submittedValue });
							} else {
								setState({ ...state, error: true, userInput: submittedValue });
							}
						}}
						error={state.error}
					/>
					of {totalPages}
				</Typography>

				<IconButton
					type="button"
					onClick={() => {
						previousPage(currentPage, totalPages);
					}}
				>
					<ArrowBackIosIcon></ArrowBackIosIcon>
				</IconButton>
				<IconButton
					type="button"
					onClick={() => {
						nextPage(currentPage, totalPages);
					}}
				>
					<ArrowForwardIosIcon></ArrowForwardIosIcon>
				</IconButton>
			</Toolbar>
		</AppBar>
	) : null;
}
export const PageControlBarContainer = connect(display.selectors.getPageControlData, {
	nextPage: display.actions.nextPage,
	previousPage: display.actions.previousPage,
})(PageControlBar);
