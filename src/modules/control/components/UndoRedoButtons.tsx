import React from "react";
import { IconButton, Card, Divider, Grid, Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { ActionCreators } from "redux-undo";
import text from "../../text";

//TODO-NICE: disable undo/redo buttons if no undo/redo possible, tried custom hook but didnt work,
// need to check all store-objects which have future/past because they have different undo/redo

// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
const UndoButton = () => {
	const dispatch = useDispatch();

	//tooltip needs non-disabled child component
	return (
		<Tooltip
			title={text.constants.undoTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<span>
				<IconButton
					type="button"
					onClick={() => {
						dispatch(ActionCreators.undo());
					}}
				>
					<UndoIcon></UndoIcon>
				</IconButton>
			</span>
		</Tooltip>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	return (
		<Tooltip
			title={text.constants.redoTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
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
