import React from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import display from "../modules/display";

export function ReaderScene() {
	return (
		<div>
			<display.components.HTMLElementMeasurer></display.components.HTMLElementMeasurer>
			<Grid
				container
				justify="center"
				direction="column"
				alignItems="stretch"
				style={{ height: "100%", width: "100%" }}
			>
				<Grid item>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>

				<Grid item>
					<display.components.Display></display.components.Display>
				</Grid>
			</Grid>
		</div>
	);
}
