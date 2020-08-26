import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Card, Grid, Divider } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { nextPage, previousPage } from "../actions";

export const PreviousButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(previousPage());
			}}
		>
			<ArrowBackIosIcon></ArrowBackIosIcon>
		</IconButton>
	);
};

export const NextButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(nextPage());
			}}
		>
			<ArrowForwardIosIcon></ArrowForwardIosIcon>
		</IconButton>
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
