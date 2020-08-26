import React from "react";
import { IconButton, Card, Divider, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { ActionCreators } from "redux-undo";
// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
const UndoButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(ActionCreators.undo());
			}}
		>
			<UndoIcon></UndoIcon>
		</IconButton>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	return (
		<IconButton
			type="button"
			onClick={() => {
				dispatch(ActionCreators.redo());
			}}
		>
			<RedoIcon></RedoIcon>
		</IconButton>
	);
};

export const UndoRedoCard = () => {
	return (
		<Card variant="outlined">
			<Grid container direction="row">
				<Grid item>
					<UndoButton></UndoButton>
				</Grid>
				<Grid item>
					<Divider orientation="vertical"></Divider>
				</Grid>
				<Grid item>
					<RedoButton></RedoButton>
				</Grid>
			</Grid>
		</Card>
	);
};
