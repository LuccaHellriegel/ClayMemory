import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";
import { Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { CardRiverState, RiverCards } from "../model";
import { getActiveRiverCards } from "../selectors";
import { incrementer } from "../../../shared/utils";
import { Card } from "./Card";
import { CardConfig } from "../../cards/model";

const GridDivider = () => (
	<Grid item>
		<Divider></Divider>
	</Grid>
);

const toCardGridItemsWithDividers = (cards: CardConfig[], riverID: string, increment: () => number) => {
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

const CardRiver = ({ riverID, riverCards }: { riverID: string; riverCards?: RiverCards }) => {
	const increment = incrementer();
	const [elevation, setElevation] = useState(3);

	return riverCards ? (
		<Accordion
			defaultExpanded={true}
			onMouseEnter={() => {
				setElevation(20);
			}}
			onMouseLeave={() => {
				setElevation(3);
			}}
			elevation={elevation}
		>
			<AccordionSummary>CardRiver</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" spacing={2} justify="center" alignItems="stretch">
					{toCardGridItemsWithDividers(Object.values(riverCards[riverID]), riverID, increment)}
				</Grid>
			</AccordionDetails>
		</Accordion>
	) : null;
};

export const CardRiverContainer = connect((state: CardRiverState) => {
	return {
		riverCards: getActiveRiverCards(state),
	};
})(CardRiver);
