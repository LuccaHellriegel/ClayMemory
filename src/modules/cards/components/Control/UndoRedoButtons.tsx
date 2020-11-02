import React, { useState } from "react";
import { IconButton, Card, Divider, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import text from "../../../text";
import { ActionCreators } from "redux-undo";
import { SimpleSnackbar } from "./SimpleSnackbar";
import { hasFuture, hasPast } from "../../selectors";

const UndoButton = ({ announce }: { announce: () => void }) => {
	const dispatch = useDispatch();
	const cardsHasPast = useSelector(hasPast);

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
						announce();
					}}
					disabled={!cardsHasPast}
				>
					<UndoIcon></UndoIcon>
				</IconButton>
			</span>
		</text.components.BiggerTooltip>
	);
};
const RedoButton = ({ announce }: { announce: () => void }) => {
	const dispatch = useDispatch();
	const cardsHasFuture = useSelector(hasFuture);
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
						announce();
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
	const [snackbarState, setSnackbarState] = useState("");

	const close = () => {
		setSnackbarState("");
	};

	return (
		<React.Fragment>
			{snackbarState === "undo" && <SimpleSnackbar message={"Executed undo"} close={close} />}

			{snackbarState === "redo" && <SimpleSnackbar message={"Executed redo"} close={close} />}

			<Card variant="outlined">
				<Grid container direction="row">
					<Grid item>
						<UndoButton
							announce={() => {
								setSnackbarState("undo");
							}}
						></UndoButton>
					</Grid>
					<Grid item>
						<Divider orientation="vertical"></Divider>
					</Grid>
					<Grid item>
						<RedoButton
							announce={() => {
								setSnackbarState("redo");
							}}
						></RedoButton>
					</Grid>
				</Grid>
			</Card>
		</React.Fragment>
	);
};
