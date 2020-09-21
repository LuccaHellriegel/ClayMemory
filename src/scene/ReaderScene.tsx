import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import { Toolbar } from "@material-ui/core";
import selection from "../modules/selection";
import display from "../modules/display";

export function ReaderScene() {
	return (
		<Fragment>
			<display.components.WindowMeasurer></display.components.WindowMeasurer>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<Grid item>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>
				{/* TODO-NICE: need this to keep the document from overlapping the AppBar, but why? */}
				<Toolbar id="back-to-top-anchor" />
				<Grid item>
					<display.components.PDFDocument></display.components.PDFDocument>
				</Grid>
			</Grid>
			<selection.components.ContextMenu></selection.components.ContextMenu>
			<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
		</Fragment>
	);
}
