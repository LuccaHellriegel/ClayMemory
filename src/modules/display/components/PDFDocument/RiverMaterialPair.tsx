import React from "react";
import { Divider, Grid } from "@material-ui/core";
import river from "../../../river";
import { PDFPage } from "./PDFPage";
import { useSelector } from "react-redux";
import { getDisplayStatus, getWindowMeasurements } from "../../selectors";
import { pairTopBottomPadding, RiverMultiplier } from "./RiverMaterialPairList";

const RiverPairItem = ({ riverID, materialHeight }: { riverID: string; materialHeight: number }) => {
	const width = useSelector(getWindowMeasurements)?.width as number;

	return (
		<div style={{ maxWidth: width * RiverMultiplier }}>
			<river.components.CardRiver riverID={riverID} materialHeight={materialHeight}></river.components.CardRiver>
		</div>
	);
};

export const RiverMaterialPair = ({
	index,
	data,
	style,
}: {
	index: number;
	data: {
		materialHeights: Map<number, number>;
	};
	style: any;
}) => {
	const pageNumber = index + 1;
	const riverID = river.model.pageNumberToRiverMakeUpID(pageNumber);
	const { materialHeights } = data;
	const showRiver = useSelector(river.selectors.getRiverShowState);
	const showMaterial = useSelector(getDisplayStatus);

	return (
		<div style={{ ...style }}>
			<river.components.SwitchActiveRiver riverID={riverID}>
				<Grid container justify="space-between" direction="row" alignItems="flex-start">
					<Grid item hidden={showRiver === "HIDE"}>
						<RiverPairItem riverID={riverID} materialHeight={materialHeights.get(pageNumber) as number}></RiverPairItem>
					</Grid>

					<Grid item hidden={showMaterial === "HIDE"}>
						<PDFPage pageNumber={pageNumber}></PDFPage>
					</Grid>
				</Grid>
			</river.components.SwitchActiveRiver>
			<Divider style={{ marginTop: pairTopBottomPadding / 2 }}></Divider>
		</div>
	);
};
