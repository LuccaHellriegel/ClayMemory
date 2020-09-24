import React from "react";
import { IconButton, Card, Divider, Grid, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import text from "../../text";
import { getLastUndoableAction, getLastRedoableAction } from "../selectors";
import { redoActionHistory, undoActionHistory } from "../actions";

// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
const UndoButton = () => {
	const dispatch = useDispatch();
	const lastUndoableAction = useSelector(getLastUndoableAction);
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
						dispatch(undoActionHistory(lastUndoableAction as string));
					}}
					disabled={!!!lastUndoableAction}
				>
					<UndoIcon></UndoIcon>
				</IconButton>
			</span>
		</Tooltip>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	const lastRedoableAction = useSelector(getLastRedoableAction);
	return (
		<Tooltip
			title={text.constants.redoTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<span>
				<IconButton
					type="button"
					onClick={() => {
						dispatch(redoActionHistory(lastRedoableAction as string));
					}}
					disabled={!!!lastRedoableAction}
				>
					<RedoIcon></RedoIcon>
				</IconButton>
			</span>
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
