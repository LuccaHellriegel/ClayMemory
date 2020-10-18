import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Card, Grid, Divider, Tooltip } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import text from "../../text";
import { actions } from "../slice";

const PreviousButton = () => {
	const dispatch = useDispatch();

	return (
		<Tooltip
			title={text.constants.previousPageTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.previousPage());
				}}
			>
				<ArrowBackIosIcon></ArrowBackIosIcon>
			</IconButton>
		</Tooltip>
	);
};

const NextButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.nextPageTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(actions.nextPage());
				}}
			>
				<ArrowForwardIosIcon></ArrowForwardIosIcon>
			</IconButton>
		</Tooltip>
	);
};

export const PageNavigation = () => {
	return (
		<Card variant="outlined">
			<Grid container direction="row">
				<Grid item>
					<PreviousButton></PreviousButton>
				</Grid>
				<Grid item>
					<Divider orientation="vertical"></Divider>
				</Grid>
				<Grid item>
					<NextButton></NextButton>
				</Grid>
			</Grid>
		</Card>
	);
};
