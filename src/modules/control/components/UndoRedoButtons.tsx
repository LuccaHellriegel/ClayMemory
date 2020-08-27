import React from "react";
import { IconButton, Card, Divider, Grid, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { ActionCreators } from "redux-undo";
import { undoTooltip, redoTooltip } from "../../../shared/tooltips";
// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
const UndoButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={undoTooltip} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(ActionCreators.undo());
				}}
			>
				<UndoIcon></UndoIcon>
			</IconButton>
		</Tooltip>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip title={redoTooltip} enterDelay={500} enterNextDelay={1000}>
			<IconButton
				type="button"
				onClick={() => {
					dispatch(ActionCreators.redo());
				}}
			>
				<RedoIcon></RedoIcon>
			</IconButton>
		</Tooltip>
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
