import React from "react";
import { Divider, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import river from "../../../river";
import { PDFPage } from "./PDFPage";
import { getWindowMeasurements } from "../../selectors";
import { CachedPageDimensions } from "./PDFDocument";

export const RiverMultiplier = 0.38;
export const MaterialMultiplier = 0.57;

export const calculateMaterialHeight = (
	pageNumber: number,
	cachedPageDimensions: CachedPageDimensions,
	windowWidth: number
) => {
	const pageDims = cachedPageDimensions.get(pageNumber) as [number, number];
	const materialWidth = windowWidth * MaterialMultiplier;

	const userSpaceUnitWidth = pageDims[0];
	const pixelPerUserSpaceUnit = materialWidth / userSpaceUnitWidth;
	const materialHeight = pageDims[1] * pixelPerUserSpaceUnit;

	const extraSpaceBetweenMaterialPages = 20;
	return materialHeight + extraSpaceBetweenMaterialPages;
};

export const PageMaterialPair = ({
	index,
	data,
	style,
}: {
	index: number;
	data: {
		cachedPageDimensions: CachedPageDimensions;
	};
	style: any;
}) => {
	const pageNumber = index + 1;
	const riverID = river.model.pageNumberToRiverMakeUpID(pageNumber);
	const { cachedPageDimensions } = data;
	const windowMeasurements = useSelector(getWindowMeasurements);
	const materialHeight = calculateMaterialHeight(pageNumber, cachedPageDimensions, windowMeasurements?.width as number);

	//TODO-RC: if I leave the river, selection should be deleted or save riverID in selection?
	// seems to be more robust, but then selection is mixed with river?
	// maybe just save Page for origin? Right now I compile the page once we actually save it,
	// but this is not robust
	return (
		<div {...{ style }}>
			{windowMeasurements && (
				<river.components.SwitchActiveRiver riverID={riverID}>
					<Grid container justify="space-between" direction="row" alignItems="flex-start">
						<Grid item>
							<river.components.CardRiver
								riverID={riverID}
								materialHeight={materialHeight}
							></river.components.CardRiver>
						</Grid>

						<Grid item>
							<PDFPage pageNumber={pageNumber}></PDFPage>
						</Grid>
					</Grid>
				</river.components.SwitchActiveRiver>
			)}

			<Divider></Divider>
		</div>
	);
};
