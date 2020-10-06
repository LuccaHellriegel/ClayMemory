import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { incrementer } from "../../../shared/utils";
import river from "../../river";
import { getNonEmptyRiverIDsSorted } from "../../river/selectors";
import { getTopOffset, getWindowMeasurements } from "../selectors";

const ExplorerRiver = ({ riverID }: { riverID: string }) => {
	const windowMeasurements = useSelector(getWindowMeasurements);
	const topOffset = useSelector(getTopOffset);

	return windowMeasurements && topOffset ? (
		<div style={{ marginBottom: "8px", marginTop: "4px" }}>
			<river.components.CardRiver
				riverID={riverID}
				materialHeight={(windowMeasurements?.height as number) - topOffset - 10}
			></river.components.CardRiver>
		</div>
	) : null;
};

export const RiverExplorer = () => {
	const riverIDs = useSelector(getNonEmptyRiverIDsSorted);
	const increment = incrementer();
	return (
		<Grid container justify="space-evenly" alignItems="center" spacing={2} style={{ width: "100%", height: "100%" }}>
			{riverIDs.map((id) => (
				<Grid item xs={4} key={increment()}>
					<river.components.SwitchActiveRiver riverID={id}>
						<ExplorerRiver riverID={id}></ExplorerRiver>
					</river.components.SwitchActiveRiver>
				</Grid>
			))}
		</Grid>
	);
};
//TODO: make error-message if jump to is executed without uploading a pdf
