import React, { useRef } from "react";
import { Divider, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import pdf from "../../../../pdf";
import river from "../../../../river";
import { getWindowMeasurements } from "../../../selectors";
import { PageSpanControl } from "./Origin/PageSpanControl";

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

	const pageRef = useRef<null | HTMLDivElement>(null);

	return (
		<div style={{ ...style }}>
			<PageSpanControl page={pageNumber} pageRef={pageRef}></PageSpanControl>
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
						<pdf.components.PDFPage
							pageNumber={pageNumber}
							pageRef={pageRef}
							materialWidth={width}
						></pdf.components.PDFPage>
					</Grid>
				</Grid>
			</river.components.SwitchActiveRiver>
			<Divider style={{ marginTop: pairTopBottomPadding / 2 }}></Divider>
		</div>
	);
};
