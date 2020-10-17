import React from "react";
import { IconButton, Card, Divider, Grid, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import text from "../../text";
import { getLastUndoableActionComb, getLastRedoableActionComb } from "../selectors";
import { redoActionHistory, undoActionHistory } from "../actions";

// we support undo/redo instead of lengthy confirmation (see The Humane Interface)
const UndoButton = () => {
	const dispatch = useDispatch();
	const lastUndoableActionComb = useSelector(getLastUndoableActionComb);
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
						for (let actionStr of lastUndoableActionComb as string[]) {
							dispatch(undoActionHistory(actionStr));
						}
					}}
					disabled={!!!lastUndoableActionComb}
				>
					<UndoIcon></UndoIcon>
				</IconButton>
			</span>
		</Tooltip>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	const lastRedoableActionComb = useSelector(getLastRedoableActionComb);
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
						for (let actionStr of lastRedoableActionComb as string[]) {
							dispatch(redoActionHistory(actionStr));
						}
					}}
					disabled={!!!lastRedoableActionComb}
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
