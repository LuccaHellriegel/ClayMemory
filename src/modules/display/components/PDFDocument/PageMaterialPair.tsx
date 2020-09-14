import React from "react";
import { Divider, Grid } from "@material-ui/core";
import river from "../../../river";
import { PDFPage } from "./PDFPage";

export const PageMaterialPair = ({
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

	//TODO-RC: if I leave the river, selection should be deleted or save riverID in selection?
	// seems to be more robust, but then selection is mixed with river?
	// maybe just save Page for origin? Right now I compile the page once we actually save it,
	// but this is not robust
	return (
		<div {...{ style }}>
			(
			<river.components.SwitchActiveRiver riverID={riverID}>
				<Grid container justify="space-between" direction="row" alignItems="flex-start">
					<Grid item>
						<river.components.CardRiver
							riverID={riverID}
							materialHeight={materialHeights.get(pageNumber) as number}
						></river.components.CardRiver>
					</Grid>

					<Grid item>
						<PDFPage pageNumber={pageNumber}></PDFPage>
					</Grid>
				</Grid>
			</river.components.SwitchActiveRiver>
			)<Divider></Divider>
		</div>
	);
};
