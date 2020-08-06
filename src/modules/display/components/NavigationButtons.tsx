import React from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
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
