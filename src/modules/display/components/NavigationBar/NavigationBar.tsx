import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Typography, TextField } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { setPage, nextPage, previousPage } from "../../actions";
import { getPageControlData } from "../../selectors";

const nonDigitRegEx = /(\D)/;

export const validatePageChoice = (possiblePage: string, totalPages: number) => {
	if (possiblePage === "" || possiblePage.trim().match(nonDigitRegEx) !== null) return false;

	const asInt = parseInt(possiblePage);
	if (asInt < 1 || totalPages < asInt) return false;

	return true;
};

function NavigationBar({
	currentPage,
	totalPages,
	nextPage,
	previousPage,
}: {
	currentPage: number;
	totalPages: number | undefined;
	nextPage: () => void;
	previousPage: () => void;
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
									dispatch(setPage(parseInt(submittedValue)));
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
						previousPage();
					}}
				>
					<ArrowBackIosIcon></ArrowBackIosIcon>
				</IconButton>
				<IconButton
					type="button"
					onClick={() => {
						nextPage();
					}}
				>
					<ArrowForwardIosIcon></ArrowForwardIosIcon>
				</IconButton>
			</Toolbar>
		</AppBar>
	) : null;
}
export const NavigationBarContainer = connect(getPageControlData, {
	nextPage,
	previousPage,
})(NavigationBar);
