import { Grid } from "@material-ui/core";
import React from "react";
import cards from "../../cards";
import { ControlBar } from "./ControlBar/ControlBar";
import { HTMLElementMeasurer } from "./HTMLElementMeasurer";
import { Body } from "./Body/Body";

export const Display = () => {
	return (
		<cards.components.UndoRedoKeyListener>
			<div>
				<HTMLElementMeasurer></HTMLElementMeasurer>
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
