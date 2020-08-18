import React from "react";
import Grid from "@material-ui/core/Grid";
import { ActiveCardRiver } from "./ActiveCardRiver";
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
