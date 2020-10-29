import React from "react";
import { IconButton, Card, Divider, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import text from "../../text";
import { ActionCreators } from "redux-undo";
import cards from "../../cards";

const UndoButton = () => {
	const dispatch = useDispatch();
	const cardsHasPast = useSelector(cards.selectors.hasPast);

	//tooltip needs non-disabled child component
	return (
		<text.components.BiggerTooltip
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
					disabled={!cardsHasPast}
				>
					<UndoIcon></UndoIcon>
				</IconButton>
			</span>
		</text.components.BiggerTooltip>
	);
};
const RedoButton = () => {
	const dispatch = useDispatch();
	const cardsHasFuture = useSelector(cards.selectors.hasFuture);
	return (
		<text.components.BiggerTooltip
			title={text.constants.redoTooltip}
			enterDelay={text.constants.defaultEnterDelay}
			enterNextDelay={text.constants.defaultEnterNextDelay}
		>
			<span>
				<IconButton
					type="button"
					onClick={() => {
						dispatch(ActionCreators.redo());
					}}
					disabled={!cardsHasFuture}
				>
					<RedoIcon></RedoIcon>
				</IconButton>
			</span>
		</text.components.BiggerTooltip>
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
