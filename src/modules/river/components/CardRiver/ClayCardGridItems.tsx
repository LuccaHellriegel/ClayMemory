import Grid from "@material-ui/core/Grid";
import React from "react";
import { incrementer } from "../../../../shared/utils";
import { ClayCard } from "../Cards/ClayCard";
import { CardConfig } from "../../../cards/model/config";
import { Divider } from "@material-ui/core";

const GridItemDivider = () => (
	<Grid item>
		<Divider></Divider>
	</Grid>
);

export const ClayCardGridItems = (cards: CardConfig[]) => {
	const increment = incrementer();

	return cards.reduce((prev, currentCard, index, arr) => {
		prev.push(
			<Grid item key={increment()}>
				<ClayCard config={currentCard} key={increment()}></ClayCard>
			</Grid>
		);

		const notLastCard = index < arr.length - 1;
		if (notLastCard) prev.push(<GridItemDivider key={increment()}></GridItemDivider>);
		return prev;
	}, [] as any[]);
};
