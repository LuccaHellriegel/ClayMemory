import Grid from "@material-ui/core/Grid";
import React from "react";
import { incrementer } from "../../../../shared/utils";
import { Card } from "./Card";
import { CardConfig } from "../../../cards/model/model";
import { Divider } from "@material-ui/core";

const GridDivider = () => (
	<Grid item>
		<Divider></Divider>
	</Grid>
);

export const toCardGridItemsWithDividers = (cards: CardConfig[], riverID: string) => {
	const increment = incrementer();

	return cards.reduce((prev, currentCard, index, arr) => {
		prev.push(
			<Grid item key={increment()}>
				<Card config={currentCard} riverID={riverID} key={increment()}></Card>
			</Grid>
		);

		const notLastCard = index < arr.length - 1;
		if (notLastCard) prev.push(<GridDivider key={increment()}></GridDivider>);
		return prev;
	}, [] as any[]);
};
