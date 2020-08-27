import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Card, Grid, Divider, Tooltip } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { nextPage, previousPage } from "../actions";
import { previousPageTooltip, nextPageTooltip } from "../../../shared/tooltips";

export const PreviousButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={previousPageTooltip} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(previousPage());
				}}
			>
				<ArrowBackIosIcon></ArrowBackIosIcon>
			</IconButton>
		</Tooltip>
	);
};

export const NextButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={nextPageTooltip} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(nextPage());
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
