import React from "react";
import Grid from "@material-ui/core/Grid";
import display from "../modules/display";
import focus from "../modules/focus";
import { useSelector } from "react-redux";
import river from "../modules/river";

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
