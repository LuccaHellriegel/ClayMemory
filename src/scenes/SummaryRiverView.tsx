import React from "react";
import Grid from "@material-ui/core/Grid";
import focus from "../modules/focus";
import { useSelector } from "react-redux";
import river from "../modules/river";

//TODO-NICE: dont show empty rivers in summary, make dropdown/create empty river button

export const SummaryRiverView = () => {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);

	return (
		<Grid item hidden={displayFocus !== "SUMMARY_RIVER"}>
			<river.components.SummaryRiver></river.components.SummaryRiver>
		</Grid>
	);
};
