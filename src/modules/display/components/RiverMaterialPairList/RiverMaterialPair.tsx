import React from "react";
import { Divider, Grid } from "@material-ui/core";
import river from "../../../river";
import { useSelector } from "react-redux";
import { getWindowMeasurements } from "../../selectors";
import pdf from "../../../pdf";

//TODO: replace this with Material-UI breakpoints
export const RiverMultiplier = 0.35;
export const pairTopBottomPadding = 20;

const RiverPairItem = ({
	riverID,
	materialHeight,
	materialWidth,
}: {
	riverID: string;
	materialHeight: number;
	materialWidth: number;
}) => {
	return (
		<div style={{ maxWidth: materialWidth * RiverMultiplier }}>
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
	const showMaterial = useSelector(pdf.selectors.getPDFShowStatus);

	const width = useSelector(getWindowMeasurements)?.width as number;

	return (
		<div style={{ ...style }}>
			<river.components.SwitchActiveRiver riverID={riverID}>
				<Grid container justify="space-between" direction="row" alignItems="flex-start">
					<Grid item hidden={showRiver === "HIDE"}>
						<RiverPairItem
							riverID={riverID}
							materialHeight={materialHeights.get(pageNumber) as number}
							materialWidth={width}
						></RiverPairItem>
					</Grid>

					<Grid item hidden={showMaterial === "HIDE"}>
						<pdf.components.PDFPage pageNumber={pageNumber} materialWidth={width}></pdf.components.PDFPage>
					</Grid>
				</Grid>
			</river.components.SwitchActiveRiver>
			<Divider style={{ marginTop: pairTopBottomPadding / 2 }}></Divider>
		</div>
	);
};
