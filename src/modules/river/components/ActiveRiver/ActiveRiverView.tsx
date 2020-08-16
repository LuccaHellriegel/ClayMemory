import React from "react";
import Grid from "@material-ui/core/Grid";
import display from "../../../display";
import focus from "../../../focus";
import { useSelector } from "react-redux";
import { ActiveRiverColumn } from "./ActiveRiverColumn";
import { riverShowStateIsShow } from "../../selectors";

export const ActiveRiverView = () => {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);
	const showMaterial = useSelector(display.selectors.displayStatusIsShow);
	const showRiver = useSelector(riverShowStateIsShow);

	return (
		<Grid item hidden={displayFocus !== "ACTIVE_RIVER"}>
			<Grid container justify="space-around" direction="row" alignItems="stretch">
				<ActiveRiverColumn hidden={!showRiver}></ActiveRiverColumn>
				<display.components.MaterialDisplayColumnWithSize
					hidden={!showMaterial}
				></display.components.MaterialDisplayColumnWithSize>
			</Grid>
		</Grid>
	);
};
