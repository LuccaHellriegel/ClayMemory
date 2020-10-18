import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { incrementer } from "../../../../shared/utils";
import { CardConfig } from "../../../cards/model/config";
import river from "../../../river";

const ClayCardExplorerGridItems = (cards: CardConfig[]) => {
	const increment = incrementer();

	return cards.reduce((prev, currentCard) => {
		prev.push(
			<Grid item key={increment()} xs={5}>
				<river.components.ClayCard config={currentCard} key={increment()}></river.components.ClayCard>
			</Grid>
		);
		return prev;
	}, [] as any[]);
};

export const CardExplorer = () => {
	const cardObjects = useSelector(river.selectors.getNonEmptyRiverCardsSorted);
	const riverContentState = useSelector(river.selectors.getRiverContentState);

	//TODO: use regex for upper/lower-case
	const riverContentFilter = useSelector(river.selectors.getRiverContentFilter);

	const filteredConfigs = river.services.filterCardConfigs(cardObjects, riverContentState, riverContentFilter);
	const gridItems = ClayCardExplorerGridItems(filteredConfigs);

	return (
		<Grid
			container
			justify="space-evenly"
			alignItems="flex-start"
			spacing={2}
			style={{ margin: "6px", width: "100%", height: "100%" }}
		>
			{gridItems}
		</Grid>
	);
};
