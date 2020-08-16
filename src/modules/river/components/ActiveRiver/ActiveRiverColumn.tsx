import React from "react";
import Grid from "@material-ui/core/Grid";
import { ActiveCardRiver } from "./ActiveCardRiver";
//TODO-RC: on top of SummaryRiver make field for navigating the river (jumping to sub-river, maybe also in sub-river for jumping around?)
//TODO-RC: make way for me to upload and download cards so I can prepare the user-study
//TODO-NICE: make River-View, where you can just see one card and can make it smaller? Maybe just button to zoom "in" / just seeing the current river
//TODO-NICE: mark Origin-Span or maybe rect over whole page-section?
//TODO-NICE: make reconciliation algorithm for origin when new PDF versions come out

export const ActiveRiverColumn = ({ hidden }: any) => {
	return (
		<Grid
			item
			style={{
				width: "38%",
			}}
			hidden={hidden}
		>
			<ActiveCardRiver></ActiveCardRiver>
		</Grid>
	);
};
