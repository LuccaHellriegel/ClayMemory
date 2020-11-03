import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Card, Grid } from "@material-ui/core";
import { getCurrentPage, getTotalPages } from "../../selectors";
import { actions } from "../../slice";

const nonDigitRegEx = /(\D)/;

export const validatePageChoice = (possiblePage: string, totalPages: number) => {
	if (possiblePage === "" || possiblePage.trim().match(nonDigitRegEx) !== null) return false;

	const asInt = parseInt(possiblePage);
	if (asInt < 1 || totalPages < asInt) return false;

	return true;
};

const PageNumberTextField = ({ totalPages }: { totalPages: number }) => {
	const dispatch = useDispatch();
	const currentPage = useSelector(getCurrentPage);

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
		<TextField
			inputProps={{
				style: {
					padding: "0px",
					//h6 Typography style
					fontSize: "1.25rem",
					fontFamily: '"Roboto", "Helvetica", "Arial", sansSerif',
					fontWeight: 500,
					lineHeight: 1.6,
					letterSpacing: "0.0075em",
				},
			}}
			type="text"
			variant="filled"
			value={state.userInput}
			onKeyDown={(event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					const submittedValue = (event.target as HTMLFormElement).value;
					if (!state.error) {
						dispatch(actions.pageUpdate(parseInt(submittedValue)));
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
	);
};

const TotalPagesIndicator = ({ totalPages }: { totalPages: number }) => (
	<Typography variant="h6">of {totalPages}</Typography>
);

export const PageChooser = () => {
	const totalPages = useSelector(getTotalPages);

	return (
		<Card variant="outlined">
			<Grid item>
				<Grid container direction="row" alignItems="center" justify="space-between">
					<Grid item style={{ width: "37%" }}>
						<PageNumberTextField totalPages={totalPages}></PageNumberTextField>
					</Grid>

					<Grid item style={{ width: "61%" }}>
						<TotalPagesIndicator totalPages={totalPages}></TotalPagesIndicator>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
};
