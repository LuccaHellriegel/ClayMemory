import React from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import creation from "../modules/creation";
import river from "../modules/river";

//TODO: make show/hide depdendant on tab, also Page choice, control-bar dependant on tab

export function ReaderScene() {
	return (
		<div>
			<control.components.ControlContainer></control.components.ControlContainer>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<control.components.ControlBar></control.components.ControlBar>
				<river.components.ActiveRiverView></river.components.ActiveRiverView>
				<river.components.SummaryRiverView></river.components.SummaryRiverView>
			</Grid>
			<creation.components.SourceMenuContainer></creation.components.SourceMenuContainer>
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
		</div>
	);
}
