import Grid from "@material-ui/core/Grid";
import React from "react";
import { incrementer } from "../../../../shared/utils";
import { ClayCard } from "./Cards/ClayCard";
import { CardConfig } from "../../../cards/model/model";
import { Divider } from "@material-ui/core";

//TODO-RC: remove saved documents / load documents via menu vs via uploading

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
				<ClayCard config={currentCard} riverID={riverID} key={increment()}></ClayCard>
			</Grid>
		);

		const notLastCard = index < arr.length - 1;
		if (notLastCard) prev.push(<GridDivider key={increment()}></GridDivider>);
		return prev;
	}, [] as any[]);
};
