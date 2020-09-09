import React, { useState } from "react";
import { Divider, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import cards from "../../../cards";
import river from "../../../river";
import { GridItemPDFPage } from "./GridItemPDFPage";

export const PageMaterialPair = ({
	index,
	data,
	style,
}: {
	index: number;
	data: {
		currentPage: number;
		numPages: number;
		pages: WeakMap<any, any>;
		pageNumbers: Map<any, any>;
		triggerResize: () => void;
	};
	style: any;
}) => {
	const cardConfigs = useSelector(cards.selectors.getCards);
	const pageNumber = index + 1;
	const riverID = river.model.pageNumberToRiverMakeUpID(pageNumber);
	const riverMakeUp = useSelector(river.selectors.getRiverMakeUps)[riverID];
	const riverCards = riverMakeUp ? riverMakeUp.cardIDs.map((id) => cardConfigs[id]) : [];
	const { numPages, triggerResize, pages, pageNumbers } = data;

	const [materialHeight, setMaterialHeight] = useState(1400);

	//TODO-RC: if I leave the river, selection should be deleted or save riverID in selection?
	// seems to be more robust, but then selection is mixed with river?
	// maybe just save Page for origin? Right now I compile the page once we actually save it,
	// but this is not robust

	return (
		<div {...{ style }}>
			<div
				ref={(ref) => {
					if (!pageNumbers.has(pageNumber)) {
						const key = { pageNumber };
						pageNumbers.set(pageNumber, key);
					}
					pages.set(pageNumbers.get(pageNumber), ref);
				}}
			>
				<river.components.SwitchActiveRiver riverID={riverID}>
					<Grid container justify="space-around" direction="row" alignItems="stretch">
						<Grid
							item
							style={{
								width: "38%",
							}}
						>
							<river.components.CardRiver
								riverID={riverID}
								riverCards={riverCards}
								materialHeight={materialHeight}
							></river.components.CardRiver>
						</Grid>

						<GridItemPDFPage
							pdfPageOuterProps={{ pageNumber, numPages, triggerResize }}
							style={{
								width: "60%",
							}}
							materialHeight={materialHeight}
							setMaterialHeight={setMaterialHeight}
						></GridItemPDFPage>
					</Grid>
				</river.components.SwitchActiveRiver>

				<Divider
					style={
						{
							//TOOD-RC: fix this somehow, this leads to constant re-render loop?
							// margin: "6px",
						}
					}
				></Divider>
			</div>
		</div>
	);
};
