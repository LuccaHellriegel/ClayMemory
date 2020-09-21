import React from "react";
import { Divider, Grid } from "@material-ui/core";
import river from "../../../river";
import { PDFPage } from "./PDFPage";
import { useSelector } from "react-redux";
import { getDisplayStatus } from "../../selectors";
import { pairTopBottomPadding } from "./RiverMaterialPairList";

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
		<div style={{ ...style, margin: "4px" }}>
			<river.components.SwitchActiveRiver riverID={riverID}>
				<Grid container justify="space-between" direction="row" alignItems="flex-start">
					<Grid item hidden={showRiver === "HIDE"}>
						<river.components.CardRiver
							riverID={riverID}
							materialHeight={materialHeights.get(pageNumber) as number}
						></river.components.CardRiver>
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
