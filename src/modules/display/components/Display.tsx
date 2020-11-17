import { Grid } from "@material-ui/core";
import React from "react";
import cards from "../../cards";
import selection from "../../selection";
import { ControlBar } from "./ControlBar/ControlBar";
import { HTMLDocumentMeasurer } from "./HTMLDocumentMeasurer";
import { Body } from "./Body/Body";
import tutorial from "../../tutorial";

export const Display = () => {
	return (
		<cards.components.UndoRedoKeyListener>
			<div>
				<tutorial.components.Tutorial></tutorial.components.Tutorial>
				<selection.components.ContextMenu></selection.components.ContextMenu>
				<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
				<HTMLDocumentMeasurer></HTMLDocumentMeasurer>
				<Grid
					container
					justify="center"
					direction="column"
					alignItems="stretch"
					style={{ height: "100%", width: "100%" }}
				>
					<Grid item>
						<ControlBar></ControlBar>
					</Grid>

					<Grid item>
						<Body></Body>
					</Grid>
				</Grid>
			</div>
		</cards.components.UndoRedoKeyListener>
	);
};
