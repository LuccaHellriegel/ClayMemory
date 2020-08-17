import React from "react";
import Grid from "@material-ui/core/Grid";
import focus from "../../../focus";
import { useSelector } from "react-redux";
import { SummaryRiver } from "./SummaryRiver";

//TODO-RC: dont show empty rivers in summary, make dropdown/create empty river button
//TODO-RC: remove GrabButton in SummaryRiver

export const SummaryRiverView = () => {
	const displayFocus = useSelector(focus.selectors.getDisplayFocus);

	return (
		<Grid item hidden={displayFocus !== "SUMMARY_RIVER"}>
			<SummaryRiver></SummaryRiver>
		</Grid>
	);
};
