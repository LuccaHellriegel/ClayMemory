import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import control from "../modules/control";
import creation from "../modules/extraction";
import { Toolbar } from "@material-ui/core";
import selection from "../modules/selection";
import display from "../modules/display";

export function ReaderScene() {
	//TODO-RC: these need to be set in the PDFDocument?
	//TODO-RC: think about hide mechanism
	// const showMaterial = useSelector(display.selectors.displayStatusIsShow);
	// const showRiver = useSelector(river.selectors.riverShowStateIsShow);

	return (
		<Fragment>
			<display.components.WindowMeasurer></display.components.WindowMeasurer>
			<Grid container justify="center" direction="column" alignItems="stretch" spacing={1}>
				<Grid item>
					<control.components.ControlBar></control.components.ControlBar>
				</Grid>
				{/* TODO-RC: need this to keep the document from overlapping the AppBar, but why? */}
				<Toolbar id="back-to-top-anchor" />
				<Grid item>
					<display.components.PDFDocument></display.components.PDFDocument>
				</Grid>
			</Grid>
			{/* //TODO-RC: switch between single and multiple pages? And then scroll to top makes sense?	*/}
			<creation.components.ContextMenuContainer></creation.components.ContextMenuContainer>
			<selection.components.SelectionSnackbar></selection.components.SelectionSnackbar>
		</Fragment>
	);
}
