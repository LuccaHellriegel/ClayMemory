import React from "react";
import Grid from "@material-ui/core/Grid";
import display from "../modules/display";
import focus from "../modules/focus";
import { useSelector } from "react-redux";
import river from "../modules/river";
import selection from "../modules/selection";
import extraction from "../modules/extraction";

export const ActiveRiverView = () => {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);
	const showMaterial = useSelector(display.selectors.displayStatusIsShow);
	const showRiver = useSelector(river.selectors.riverShowStateIsShow);
	return (
		<Grid item hidden={displayFocus !== "ACTIVE_RIVER"}>
			<Grid container justify="space-around" direction="row" alignItems="stretch">
				<Grid
					item
					style={{
						width: "38%",
					}}
					hidden={!showRiver}
				>
					<river.components.ActiveCardRiver></river.components.ActiveCardRiver>
				</Grid>
				<display.components.MaterialDisplayColumnWithSize
					hidden={!showMaterial}
				></display.components.MaterialDisplayColumnWithSize>
			</Grid>
		</Grid>
	);
};

const rightClickControl = (event: MouseEvent) => {
	return (dispatch: any, getState: Function) => {
		const state = getState();

		// this was set via left-click
		const selectedStr = selection.selectors.getCurrentSelectedString(state);

		if (selectedStr === "") return;

		event.preventDefault();

		// this is the dispatch for the ContextMenu inside the editor
		dispatch(selection.actions.updateSelectionPosition(event.x, event.y));
		dispatch(extraction.actions.openContextMenu());
	};
};
