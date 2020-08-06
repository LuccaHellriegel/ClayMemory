import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField } from "@material-ui/core";
import { setPage } from "../../actions";
import { getPageControlData } from "../../selectors";

const nonDigitRegEx = /(\D)/;

export const validatePageChoice = (possiblePage: string, totalPages: number) => {
	if (possiblePage === "" || possiblePage.trim().match(nonDigitRegEx) !== null) return false;

	const asInt = parseInt(possiblePage);
	if (asInt < 1 || totalPages < asInt) return false;

	return true;
};

export const PageChooser = () => {
	const dispatch = useDispatch();
	// parent only renders this component if these values exist
	const { currentPage, totalPages }: { currentPage?: number; totalPages?: number } = useSelector(getPageControlData);

	const [state, setState] = useState({
		error: false,
		value: currentPage?.toString(),
		userInput: currentPage?.toString(),
	});

	// with this we can trigger a re-render onChange,
	// while making sure that if a new currentPage arrives, we reset the component
	if (state.value !== currentPage.toString()) {
		setState({ error: false, value: currentPage.toString(), userInput: currentPage.toString() });
	}

	return (
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
					if (validatePageChoice(submittedValue, totalPages as number)) {
						setState({ ...state, error: false, userInput: submittedValue });
					} else {
						setState({ ...state, error: true, userInput: submittedValue });
					}
				}}
				error={state.error}
			/>
			of {totalPages}
		</Typography>
	);
};
